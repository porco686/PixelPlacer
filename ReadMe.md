 **1 - How To Use:** 
  Drag Image 🖼️ To Current __Directory__ 📂.
  Open __Terminal__ Into Current __Directory__.
  Write __"npm i"__ And Enter.
  Write __"node ."__ And Enter.
  Choose The Image You Dragged (Use Up/Down Arrows) And Enter.
  Choose Scale To Scale __Up__or __Down__ The Image, A Postive Number Is __Up__ and Negative Number Is __Down__. 
  Write __OutPut Name__ That The __OutPut__ Will Be Written In ⌨️.
  Wait For Image __Formatting/Processing/Reading/ColorDetecting/Transpiling/Mapping__.
  Done. Have Fun With The __Image__! 🎉🎉.


 **2 - How To Configure**:
  Open __PixelPlacerConfig.JSON__ with NotePad. 
  Replace Values That You Want To Reconfigure.
  Make Sure To Leave The Colon(:) As It Is And The Quotation Marks(") As Is, Otherwise It Will Break.
  Save Changes(Control + S).
  Close.
  Start A New Process.


 3 - Best practicies: 
  Have Image Without Much Detail Like Sample.JPG.
  Use [BUILD-TYPE=PRE-BUILD] To Avoid Continous Writing And Reading.
  Use Small Low Resolution Images.
  Use Image With Vibrant Colors For Color Detection.
  Scale Image Down, Best Resolution: 150x150 For It To Be Fast And Precise.


 4 - Code Inner Workings: 
  Provide CLI Data.
  Format File JPG.
  Fetch Image Data Pixels.
  Maps Pixel Colors to Color Pallet.
  Stores Color Pallet In Array. 
  Creates Output(TXT) File.
  Chunks Array In Segments where 1 Segment Is a New Line.
  [If BUILD-TYPE=PRE-BUILD] Maps Chuncked Array To String And Writes String To OutPut.
  [If BUILD-TYPE=REALTIME-BUILD] Maps Chuncked Array Segment By Segment And Writes Each Segment By The Time Its Read.
 
 
 5 - Packages Credit: 
  Jimp(Image reading).
  Lodash(Data management).
  Path(File paths) 🛣️.
  RgbToHex(RGB to Hexadecimal) 🖌️.
  Fs(File System) 📁.
  Inquirer(Command prompt questions UI) 🕵️.
  Chalk(Command prompt text UI).
  HexToColorName(Color recognition Hexadecimal To Name) 🎨.

  6 - Trouble Shooting: 
   1 - Node Is Not Recognized As Internal Or External Command, Operable Program, Or Script File: 
    This Means You Have Not Downloaded And Installed Node.js, Go To https://nodejs.org/en And Download And Install Latest Then Try Again
   2 - Cannot Find Module:
    If This Happens To You It Means The Required Scripts Arent Present, You Can Install Them using "npm i", Or "npm i [the name of the module missing]"

  7 - Sample.JPG: Is An Image That Garuntee 100% Works With Good Results

  8 - Developer: Kamui{ポ}#0693 
  