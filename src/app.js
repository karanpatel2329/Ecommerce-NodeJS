const express = require('express');
const Product = require('./model/product');
const Order = require('./model/order');
const Cart = require('./model/cart');
const { CommandStartedEvent } = require('mongodb');
const ObjectId = require('mongoose').ObjectId;
require('./db/mongoose');

const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());
app.post('/addProduct',(req,res)=>{
    const newProduct = new Product(req.body);
    newProduct.save().then(()=>{
        res.send("User Add Successfull"+newProduct);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});
app.post('/placeOrder',(req,res)=>{
    const newOrder = new Order(req.body);
    newOrder.save().then(()=>{
        res.send("User Add Successfull"+newOrder);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.post('/addCart',async(req,res)=>{
    const cart =await Cart.find({}).then((res)=>{
        return res;
    });
    console.log(cart.length);
    if(cart.length!=0){
        newItems = [];
        var oldItem=[];
        items=cart[0].items;
        const price = cart[0].totalCost+req.body['totalCost'];
        const qty = cart[0].totalQty+req.body['totalQty'];
        oldItem =cart[0].items;
        for(var i in oldItem){
            console.log(oldItem[i])
            newItems.push(oldItem[i])
        }
        newItems.push(req.body['items'][0])
        newItems.concat(oldItem)
        
        Cart.deleteOne({_id:cart[0]._id}).then((res)=>{
            console.log(res)
        }).then(()=>{
            const newsCart = new Cart({
                "totalQty":qty,
                "totalCost":price,
                "items":newItems
            });
            newsCart.save().then(()=>{
                res.send("Cart add Successfull"+newsCart);
            }).catch((e)=>{
                res.status(400).send(e);
            });
        });
    
        
    }
    else{
//    console.log(a);
    console.log("Aa");
    const newCart = new Cart(req.body);
    newCart.save().then(()=>{
        res.send("Cart add Successfull"+newCart);
    }).catch((e)=>{
        res.status(400).send(e);
    });
    }
});
app.get('/allProduct',(req,res)=>{
    Product.find({},(err,rest)=>{
        if(err){
            res.send(err);
        }else{
            res.send(rest);
        }
    })
})
app.get('/getProduct/:title',(req,res)=>{
    //const title = req.params;
    Product.find({title:req.params['title']},(err,rest)=>{
        console.log(rest);
        if(err){
            console.log(req.params['title'])
        }
        res.send(rest)
    })
});


app.get('/getCart',(req,res)=>{
    Cart.find({},(err,rest)=>{
        if(err){
            console.log(err);
        }else{
            res.send(rest);
        }
    })
});
app.listen(PORT,()=>{
    console.log("Sever Started at "+PORT); 
})