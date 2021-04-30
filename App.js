const puppeteer = require('puppeteer');
const resizeImg = require('resize-image-buffer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //852×480
  await page.setViewport({width: 512, height: 448, deviceScaleFactor: 1});
  await page.goto('https://github.com/');
  //await page.screenshot({ path: 'example.png' });


  const imageBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 100,
    });

  	scaleImg(1,imageBuffer)
  	scaleImg(2,imageBuffer)
  	scaleImg(3,imageBuffer)

  	//newImg=resample(imageBuffer,640,360,64,32)
  	async function scaleImg(scale,img){
  		const newImg = await resizeImg(img, {
	    width: 16*scale,
	    height: 14*scale,
	  });

	  	if(newImg){
	  		 require("fs").writeFile("public/git"+scale+".jpg", newImg, 'base64', function(err) {
		  console.log(err);
		});
	  	}else{
	  		console.log('image buffer empty')
	  	}
  	}
  await browser.close();
})();


/*
 function resample(_data,_width,_height, newWidth, newHeight){
        if(_data == undefined) return;
        //
        // Get a new buuffer to interpolate into
        let newData = [newWidth * newHeight * 3];

        let scaleWidth =  newWidth / _width;
        let scaleHeight = newHeight / _height;

        for(let cy = 0; cy < newHeight; cy++)
        {
            for(let cx = 0; cx < newWidth; cx++)
            {
                let pixel = (cy * (newWidth *3)) + (cx*3);
                let nearestMatch =  (((cy / scaleHeight) * (_width *3)) + ((cx / scaleWidth) *3) );

                newData[pixel    ] =  _data[nearestMatch    ];
                newData[pixel + 1] =  _data[nearestMatch + 1];
                newData[pixel + 2] =  _data[nearestMatch + 2];
            }
        }



        return Buffer.from(newData);
    }*/