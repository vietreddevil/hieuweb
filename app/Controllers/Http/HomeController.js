'use strict'

const auth = require("../../../config/auth");
const User = use('App/Models/User');
const FileSaver = use('App/Models/FileSaver');
const fs = require('fs');
const path = require('path');
const Helpers = use('Helpers')
const readFile = Helpers.promisify(fs.readFile)
const Env = use('Env')

const file_path = "E:/";

class HomeController {
    async ProductInfo({ request, response, view, params }) {
        try {
            let productID = params.product;
            let productInfo = await FileSaver.find(productID);
            return response.send(view.render('product-info', { productInfo: productInfo }));
        } catch (e) {
            return response.send("đã xảy ra lỗi, vui lòng chờ đợi trong giây lát!");
        }
    }

    async Welcome({ response, view }) {
        let products = await FileSaver.all();
        return response.send(view.render('welcome', { products: products.rows }))
    }

    async Login({ request, response, view, auth }) {
        // let user = {
        //     email: "admin@gmail.com",
        //     password: "1324Aa4321"
        // } 
        let { username, password } = request.all();
        try {
            await auth.remember().attempt(username, password);
            return response.send(view.render('welcome'));
        } catch (e) {
            console.log(e);
            return response.redirect('/admin-home');
        }
    }

    async AdminHome({ request, response, view, auth }) {
        try {
            await auth.getUser();
            let products = await FileSaver.all(); 
            products = products.rows;
            for await (let product of products) {
                product["path"] = file_path + product.fileID;
            }
            return response.send(view.render('admin-home', {products: products, datatable: true}));
        } catch (e) {
            console.log(e)
            return response.send(view.render('login'));
        }
    }

    async Download({ request, response }) {
        try {
            let { productID } = request.all();  
            // response.download(Helpers.tmpPath(file_path + productID + ".zip")); 
            // fs.readFile(file_path + productID + ".zip", (error, contents) => { 
            //     response.send(contents)
            // });
            let filename = file_path + productID + ".zip"
             
            // response.download("E:/7.zip")
            response.download(filename)
            // response.download(file_path + productID + ".zip")
        } catch (e) {
            console.log(e)
        }
    }

    async AddItem({ request, response, auth }) {
        try {
            await auth.getUser();
            let { title, version, videourl, desc } = request.all();
            let fileSaver = {
                title: title,
                version: version,
                videourl: videourl,
                description: desc
            }
            let fileID = await FileSaver.create(fileSaver);
            var fileee = request.file('file');
            await fileee.move(file_path, {
                name: fileID.toJSON().fileID + '.zip',
                overwrite: true
            });
        } catch (e) {
            console.log(e);
            return response.send("404");
        }
    }

    async Delete({ request, response, auth, params }) {
        try {
            await auth.getUser();
            let fileID = (params.id);
            let product = await FileSaver.find(fileID);
            await product.delete();
            return response.redirect('/admin-home')
        } catch(e) {
            return response.send("404");
        }
    }
}

module.exports = HomeController
