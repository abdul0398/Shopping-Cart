const mongoose = require("mongoose");
const Product = require("./models/product");
const products  = [
    {
        name:"Iphone 11",
        img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price:100000,
        desc:"The iPhone is a line of smartphones produced by Apple Inc. which uses Apple's own iOS mobile operating system"
    },
    {
        name:"Reebok Shoes",
        img:"https://images.unsplash.com/photo-1530389912609-9a007b3c38a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        price:10000,
        desc:"Reebok International Limited is an American fitness footwear and clothing brand that is a part of Authentic Brands Group."
    },
    {
        name:"Watch",
        img:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price:12000,
        desc:"A watch is a portable timepiece intended to be carried or worn by a person. It is designed to keep a consistent movement despite the motions"
    },
    {
        name:"Mackbook",
        img:"https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFja2Jvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price:100000,
        desc:"The MacBook is a brand of Mac notebook computers designed and marketed by Apple Inc. that use Apple's macOS operating system since 2006."
    }
]
// Product.insertMany(products).then((data)=>{
//     console.log("Successfully seeded");
// }).catch((err)=>{
//     console.log(err);
// })
async function insert(){
    await Product.deleteMany({});
    await Product.insertMany(products)
    console.log("Db seeded");
}
module.exports = insert;// exporting the function then calling seeding through main index.js