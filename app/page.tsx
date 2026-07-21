import Image from "next/image";
// import "./globals.css";


const data = [
    {
        image: "/image/Image_1.png",
        propertyName: "Park Avenue",
        price: "₦1,650,000",
        address: "Ikeja GRA, Lagos",
        bed: 3,
        bath: 2,
    },
    {
        image: "/image/Image_2.png",
        propertyName: "Classical House",
        price: "₦3,500,000",
        address: "Ibadan, Oyo state",
        bed: 4,
        bath: 2,
    },
    {
        image: "/image/Image_3.png",
        propertyName: "Serenity Ridge Villa",
        price: "₦2,500,000",
        address: "Lekki Phase 1, Lagos",
        bed: 2,
        bath: 1,   
    },
    {
        image: "/image/Image_4.png",
        propertyName: "Bayview Luxury",
        price: "₦1,650,000",
        address: "Osborne Foreshore, Ikoyi",
        bed: 1,
        bath: 1,   
    },
    {
        image: "/image/Image_5.png",
        propertyName: "Lakeside Haven",
        price: "₦1,900,000",
        address: "Ajah, Lagos",
        bed: 2,
        bath: 2,   
    },
    {
        image: "/image/Image_6.png",
        propertyName: "Classic Villa",
        price: "₦2,050,000",
        address: "Chevron Drive, Lekki",
        bed: 2,
        bath: 1,   
    }
]

export default function Home() {
  return (
    <div>
      <nav>
      <img src="image/Logo.png" alt="Logo" />
      <div className="Nyangu">
        <a href="">About</a>
        <a href="">Rentals</a>
        <a href="">Manage Listings</a>
        <a href="">Rentals</a>
      </div>
      <div className="Nyangu">
        <a href="">Post a property</a>
        <a href="">log in</a>
        <button className="btn">Sign Up</button>
      </div>
      </nav>

      <div className="w-10/12 mx-auto my-20">
        <main className="listings">
        {data.map((item, index) => (
          <div className="card" key={index}>
          <Image src={item.image} alt="" width={400} height={200} className="mb-4" />
          <div className="content">
            <div className="content-up">
              <div>
                <p>{item.propertyName}</p>
                <p>{item.address}</p>
              </div>
              <p>{item.price}</p>
            </div>
            <div className="content-down">
              <div className="ammenities">
                <div className="ammenity">
                  <img src="/image/beds_icon.png" alt="beds_icon" />
                  <p>{item.bed}</p>
                </div>
                <div className="ammenity">
                  <img src="/image/bathtub_icon.png" alt="beds_icon" />
                  <p>{item.bath}</p>
                </div>
              </div>

              <div className="compare">
                <input type="checkbox" name="" id="" />
                <label>Compare</label>
              </div>
            </div>
          </div>
        </div>
        ) )}
      </main>
      </div>
    </div>
  );
}
