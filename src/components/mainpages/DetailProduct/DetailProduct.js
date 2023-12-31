import React, {useContext, useState, useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/ProductItem/ProductItem';
function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct,setDetailProduct] = useState([])
    useEffect(()=>{
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id)
                setDetailProduct(product)
            });
        }
        
    },[params.id,products])
    //console.log(detailProduct)
    if(detailProduct.length == 0) return null
    return (
        <>
            <div className='detail'>
                <img src={detailProduct.images.secure_url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.product_id}</h6>

                    </div>
                    <span>${detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to='/cart' className='cart-buy'
                    onClick={()=>{addCart(detailProduct)}}
                    >Buy now</Link>
                </div>

            </div>
            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product=>{
                            //ý tưởng vì sản phẩm liên quan không nên lặp lại với detail product nên tôi thêm 
                            // && product._id != detailProduct._id
                            return product.category === detailProduct.category
                                ?<ProductItem key={product._id} product={product}/>: null
                        })
                    }
                </div>
            </div>
         </>
    )
}

export default DetailProduct
