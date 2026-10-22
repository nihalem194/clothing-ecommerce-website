import { Link } from "react-router-dom";

const HeroCard = () => {
  return (
    <>
      
        <div className="hero-card-container w-[21rem] h-[32rem] p-2   flex flex-col  ">

          <div className="hero-card-img w-[90%] h-[90%] overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZXFje7gQ9mIkScEVR-gVJMcsraugRgjVqQKpMpyZMQ&s=10"
              alt="Men's fashion"
            />
          </div>
          <div className="hero-image-content pt-1 ">
                 <h5>Casual Wear</h5>
                <p className="w-[90%]">Explore stylish casual wear designed for everyday comfort,
                   effortless style, and modern looks.</p>
                <Link to="**" ><p className="text-slate-600">Discover Now</p></Link>
          </div>
        </div>
      
    </>
  );
};

export default HeroCard;
