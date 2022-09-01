'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha'); 

class BoardController extends Controller {
    // 檢視留言
    async index() {
        const ctx = this.ctx;
        // 當前頁面若未設定則預設為第1頁
        let curPage = Number(this.ctx.query.page) || 1;
        if(curPage < 1){
            curPage = 1;
        }
        // 每頁顯示的留言數
        let pageSize = 2;
        // 總留言數
        let rows = await ctx.model.Message.count({});
        // 總頁數
        let pages = Math.ceil(rows / pageSize);
        if(pages > 0 && curPage > pages){
            curPage = pages;
        }
        // 從第幾筆開始取資料
        let offset = (curPage - 1) * pageSize;
        // 取出留言
        let msgs = await ctx.model.Message.findAll({
            order: [
                ['id', 'desc']
            ],
            offset: offset,
            limit: pageSize,
        });
        await ctx.render('index.html', {
            msgs: msgs,
            pagination: {
                pageSize: pageSize,
                curPage: curPage,
                rows: rows,
                pages: pages,
            }
        });        
    }
    // 新增留言
    async create() {
        const ctx = this.ctx;
        const { name, email, message, captcha } = ctx.request.body;
        let verify = ctx.session.captcha;
        ctx.body = verify;
        if(captcha === verify){
            const rec = await ctx.model.Message.create({ name, email, message });
            ctx.status = 201;
            ctx.redirect('/message');
        }else{
            ctx.body = {
                err: '驗證碼錯誤',
            };
        }
    }
    // 檢視特定留言
    async show() {
        const ctx = this.ctx;
        let id = ctx.params.id;
        const msg = await ctx.model.Message.findByPk(id);
        if(!msg){
            ctx.status = 404;
            return;
        }
        ctx.body = msg;
    }
    // 編輯留言
    async update() {
        const ctx = this.ctx;
        let id = ctx.params.id;
        const msg = await ctx.model.Message.findByPk(id);
        if(!msg){
            ctx.status = 404;
            return;
        }
        await msg.update({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            message: ctx.request.body.message,
        });
        ctx.status = 200;
        ctx.redirect('/message');
    }
    // 刪除留言
    async destroy() {
        const ctx = this.ctx;
        let id = ctx.params.id;
        const msg = await ctx.model.Message.findByPk(id);
        if(!msg){
            ctx.status = 404;
            return;
        }
        await msg.destroy();
        ctx.status = 204;
        ctx.redirect('/message');
    }
    // 取得驗證碼圖片
    async captcha() {
        const ctx = this.ctx;
        const captcha = svgCaptcha.createMathExpr({
            size: 4,
            fontSize: 50,
            ignoreChars: '0Ol',
            width: 120,
            height: 40,
            noise: Math.floor(Math.random() * 5),
            color: true,
            background: '#999999',
        });
        ctx.session.captcha = captcha.text;
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
}

module.exports = BoardController;