'use strict';

const Controller=require('egg').Controller;

class BoardController extends Controller {
    // 檢視留言
    async index() {
        const ctx = this.ctx;
        // 分頁處理
        let curpage =  Number(this.ctx.query.page) || 1;
        if(curpage < 1){
            curpage = 1;
            ctx.status = 201;
            ctx.redirect('/message');
        }
        // 每頁顯示的留言數
        let pagesize = 2;
        // 總留言數
        let rows = await ctx.model.Message.count({}) || 1;    
        // 總頁數
        let pages = Math.ceil(rows / pagesize);
        if(curpage > pages){
            curpage = pages;
            ctx.status = 201;
            ctx.redirect('/message?page='+pages);
        }        
        // 從第幾筆開始取資料
        let offset = (curpage - 1) * pagesize;        
        let msgs = await ctx.model.Message.findAll({
            order: [
                ['id','DESC']
            ],
            offset: offset,
            limit: pagesize,
        });
        await ctx.render('index.html', {
            msgs: msgs,
            pagination: {
                pagesize: pagesize,
                curpage: curpage,
                rows: rows,
                pages: pages,
            }
        });
    }
    // 新增留言
    async create() {
        const ctx = this.ctx;
        const {name, email, message} = ctx.request.body;
        const rec = await ctx.model.Message.create({name, email, message});
        ctx.status = 201;
        ctx.redirect('/message');
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
}

module.exports = BoardController;