import { Link } from "react-router-dom"

const PRODUCT_ITEM = 199;
const Home = () => {

    return (
        <div className="w-full h-auto">
            <div className="grid gap-1.5 grid-cols-2 p-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4" >
                <Link to="/login" className=" py-2 px-10 w-full rounded-md bg-blue-600 text-white transition-all duration-500 cursor-pointer hover:bg-blue-900">Log In</Link>
            {[...Array(100).keys()].map((_, i) => (
                <div key={i} className="w-auto h-30 bg-slate-300 p-2 rounded-lg shadow-md">
                    <h1>Product Buy {i + 1}</h1>
                    <Link to={`/payment/${PRODUCT_ITEM * i +1}`}>
                        <button className="mt-2 py-2 w-full rounded-md bg-blue-600 text-white transition-all duration-500 cursor-pointer hover:bg-blue-900">
                            Buy Now
                        </button>
                    </Link>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Home