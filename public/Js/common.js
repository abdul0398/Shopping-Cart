console.log('Connected');
const likeButtons = document.getElementsByClassName("like-button");
for(let item of likeButtons){
    item.addEventListener('click',async ()=>{
            product_id = item.getAttribute("product-id");
        try {
            response = await axios({// Ajax request 
                method:"post",
                url:`/product/${product_id}/like`,
                headers:{// adding header to mark it as an AJAX req.
                    'X-Requested-With':'XMLHttpRequest'
                }
            });
            if(item.children[0].classList.contains('fas')){// if it is already liked 
                item.children[0].classList.remove('fas');// removing filled heart class
                item.children[0].classList.add('far');// adding hollow heart class
            }else{
                item.children[0].classList.add('fas');
                item.children[0].classList.remove('far');
            }
        } catch (error) {
            // window.location is current url;
            window.location.replace('/login');// if not loggedin redirecting to login page
            console.log(error.message);   
        }
    })
}