
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import HeroCard from "../../components/Common/HeroCard/HeroCard";

// const categories = [
//   {
//     name: "Women's Fashion",
//     image:
//       "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
//   },
//   {
//     name: "Men's Fashion",
//     image:
//       "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600",
//   },
//   {
//     name: "Accessories",
//     image:
//       "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
//   },
// ];

// const products = [
//   {
//     id: 1,
//     name: "Classic White Shirt",
//     price: 1299,
//     category: "Men",
//     image:
//       "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600",
//   },
//   {
//     id: 2,
//     name: "Everyday Handbag",
//     price: 1899,
//     category: "Accessories",
//     image:
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
//   },
//   {
//     id: 3,
//     name: "Casual Summer Outfit",
//     price: 1599,
//     category: "Women",
//     image:
//       "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
//   },
//   {
//     id: 4,
//     name: "Minimal Sneakers",
//     price: 2199,
//     category: "Footwear",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
//   },
// ];

function Home() {
  return(
    <>

    {/* <HeroCard /> */}
    
    <main>

       {/*Hero  */}
      <section className="w-[100%] h-[90vh] px-[50px] bg-amber-50">

          <div className="hero-img">
            <div className="hero-img-content">
              <h3>Elevate Your <br /> <span className="font-light">Everyday Style</span></h3>
              <p>Discover the latest men's fashion with premium styles</p>
            <Link to={"*"}><button  className="hero-btn  text-amber-50 bg-amber-800 font-medium transition duration-300 hover:bg-amber-900">Shop Now</button></Link>
            </div>
          </div>

      </section>

      
      {/* provides */}
      <section>


      </section>



      {/* category */}
      <section className="catogory">
        

      </section>
    

    
    </main>
    


    
    </>
  )
  
}

export default Home;
