import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { loadWeb3 } from "../../apis/api";
import { wireNftContractAbi, wireNftContractAddress } from "../../utilies/constant";
import "./Front4.css";

export default function Front4() {


  let [btnTxt, setBtTxt] = useState("Connect");
  let [imageArray, setImageArray] = useState([]);
  let [initialLimit, setInitialLimit] = useState(0);
  let [finalLimit, setFinalLimit] = useState(12)
  let [mywalletLength, setMyWalletLength] = useState();
  let [pageNumber, setPageNumber] = useState(1)
  let [totalPages, setTotalPages] = useState(1)

  const getAccount = async () => {
    let acc = await loadWeb3();
    console.log("ACC=", acc)
    if (acc == "No Wallet") {
      setBtTxt("No Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else {
      let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);

    }
  }

  const loadMore = () => {

    let a = finalLimit + 6
    if (a >= mywalletLength) {
      setInitialLimit(initialLimit + 6)
      if (pageNumber < totalPages) {

        setPageNumber(pageNumber + 1)
      }
      console.log("Loading More Up");
      setFinalLimit(mywalletLength)
    } else {
      console.log("Loading More");
      if (pageNumber < totalPages) {

        setPageNumber(pageNumber + 1)
      }
      setInitialLimit(initialLimit + 6);
      setFinalLimit(finalLimit + 6)
    }
  }

  const loadLess = () => {
    let b = finalLimit - 6

    if (b <= 6) {

      setFinalLimit(6);
      setInitialLimit(0);
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1)
      }
    } else {
      setInitialLimit(initialLimit - 6);
      setPageNumber(pageNumber - 1)
      setFinalLimit(finalLimit - 6)

    }
  }
  const allImagesNfts = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      console.log("wallet");
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else if (acc == "Connect Wallet") {
      console.log("Connect Wallet");
    }
    else {
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(wireNftContractAbi, wireNftContractAddress);
      let simplleArray = [];
      let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
      // walletOfOwner=walletOfOwner[2];

      let walletLength = walletOfOwner.length
      setMyWalletLength(walletLength)
      console.log("walletOfOwner", walletOfOwner);
      for (let i =0; i<walletLength; i++) {
        console.log("i",i);
        
        try {
          let res = await axios.get(`https://gateway.pinata.cloud/ipfs/QmWC48u2Rj84M9ufzFFxSD41AQmq2QFMUhFhiu7aT2DFq8/${walletOfOwner[i]}.png`)
          // let res = await axios.get(`/config/${walletOfOwner[i]}.json`)
          let imageUrl = res.config.url  ;
          console.log("check",res);
          let dna = walletOfOwner[i]
          simplleArray = [...simplleArray, { imageUrl: imageUrl, num: dna }]
          setImageArray(simplleArray);
        } catch (e) {
          console.log("Error while Fetching Api", e)
        }
      }
      let ttlPage = parseInt(walletLength) / 6;
      ttlPage = Math.ceil(ttlPage);
      setTotalPages(ttlPage)
      console.log("Total Pages", ttlPage);
      if (parseInt(walletLength) > 0) {
        {
          let myImgArry = []
          let myNameDate = []
         
        }
      }
    }
  }


  useEffect(() => {
    allImagesNfts()
    getAccount();

  }, []);
  return (
    <div>


      <div
        class="live-auctions-area section-padding-100-50 bg-overlay-2 bg-img"
      // style="background-image: url(bg-shape.jpg);"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <h6 class="heading-sub">New Collection</h6>
              <h2 class="heading-title">All Collections</h2>
            </div>
          </div>

          <div class="row justify-content-center">

            {
              imageArray.map((items, idex) => {
                return (
                  
                    <div class="col-sm-6 col-lg-4">
                      <div class="single-live-auction home-2">
                        <div class=" home-2">
                          <img src={items.imageUrl} alt="Image" width="100%" />
                        </div>

                        <div class="collection-text home-2 text-center">
                          <a href="#">WHE NFT {items.num} </a>
                        
                        </div>
                      </div>
                    </div>
                    
                    
                  
                )
              })
            }
            {/* <div class="col-sm-6 col-lg-4">
              <div class="single-live-auction home-2">
                <div class="auction-thumb home-2">
                  <img src="s-5.jpg" alt="Image" />
                </div>

                <div class="collection-text home-2 text-center">
                  <a href="#">Jisan Donan</a>
                  <p>20% of the part</p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4">
              <div class="single-live-auction home-2">
                <div class="auction-thumb home-2">
                  <img src="s-2.jpg" alt="Image" />
                </div>

                <div class="collection-text home-2 text-center">
                  <a href="#">Trihana Donan</a>
                  <p>40% of the part</p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4">
              <div class="single-live-auction home-2">
                <div class="auction-thumb home-2">
                  <img src="s-3.jpg" alt="Image" />
                </div>

                <div class="collection-text home-2 text-center">
                  <a href="#">Jisan Donan</a>
                  <p>20% of the part</p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4">
              <div class="single-live-auction home-2">
                <div class="auction-thumb home-2">
                  <img src="s-5.jpg" alt="Image" />
                </div>

                <div class="collection-text home-2 text-center">
                  <a href="#">Jisan Donan</a>
                  <p>20% of the part</p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4">
              <div class="single-live-auction home-2">
                <div class="auction-thumb home-2">
                  <img src="s-6.jpg" alt="Image" />
                </div>

                <div class="collection-text home-2 text-center">
                  <a href="#">Jisan Donan</a>
                  <p>20% of the part</p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4">
              <div class="single-live-auction home-2">
                <div class="auction-thumb home-2">
                  <img src="s-4.jpg" alt="Image" />
                </div>

                <div class="collection-text home-2 text-center">
                  <a href="#">Jisan Donan</a>
                  <p>20% of the part</p>
                </div>
              </div>
            </div> */}

            {/* <!-- Button -->
                <!-- <div class="col-12">
                    <div class="btn-area mb-50 text-center">
                        <a class="btn btn-box" href="#">View All</a>
                    </div>
                </div> --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
