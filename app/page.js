import Image from "next/image";
import styles from "./page.module.css";
import TourPage from "./components/TourPage";
import MyPhoneInput from "./components/MyPhoneInput";

export default function Home() {
  return (
    <>
      {/* <TourPage /> */}

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card p-5">
              <MyPhoneInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
