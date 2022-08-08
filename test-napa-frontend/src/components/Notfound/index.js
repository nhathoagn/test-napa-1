import React from "react";
import imageEmpty from "../../access/image-empty.png"
import "./index.css"
const Notfound = () => {
  return(
      <>
          <div className="notfound-container">
            <div className="notfound-content">
                <div className="notfound-content-img">
                    <img src={imageEmpty}/>
                </div>
                <div className="notfound-content-text">
                    <p className="notfound-content-text-title">No Results Found</p>
                    <p className="notfound-content-text-result">No content matched your criteria. Try searching for something else.</p>
                </div>
            </div>
          </div>
      </>
  )
}
export default Notfound