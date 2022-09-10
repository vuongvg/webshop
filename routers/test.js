const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   let i3 = 0;
   const max = 1e8 * 2;
   const min = 1e6;
   const num = max - min;
   let start3 = Date.now();
   let v2 = 0,
      v3 = 0,
      timeStart = 0;

   function count3() {
      if (v3 < 10) {
         timeStart = Date.now();
      }
      v3++;
      // move the scheduling to the beginning
      if (i3 < num) {
         setTimeout(count3); // schedule the new call
         //    queueMicrotask(count3);
         // process.nextTick(count3)
      }

      const timeStart2 = Date.now();
      do {
         i3++;
      } while (i3 % min != 0);

      if (v3 < 10) {
        //  console.log("time3: ", Date.now() - timeStart2 + ' ms');
      }
      // if (v3 < 10) {
      //    timeStart = Date.now();
      // }

      if (i3 == max) {
         console.log("Done in 3: " + (Date.now() - start3) + "ms3");
      }
      //    if (i3 != max) {
      //       setTimeout(count3); // schedule the new call (**)
      //     //   queueMicrotask(count3);
      //    }
   }
   ////////////
   let i2 = 0;

   let start2 = Date.now();

   function count2() {
      if (v2 < 10) console.log("time", Date.now() - timeStart + " ms");
      v2++;
      // move the scheduling to the beginning
      // if (i2 < num) {
      //    setTimeout(count2); // schedule the new call
      //    //  queueMicrotask(count2);
      // }
      do {
         i2++;
      } while (i2 % min != 0); 

      if (i2 == max) {
         console.log("Done in 2 " + (Date.now() - start2) + "ms2");
      }
      if (i2 != max) {
         setTimeout(count2); // schedule the new call (**)
         //  queueMicrotask(count2);
         // process.nextTick(count2)
      }
   }

   count2();
   count3();
   res.send("test");
});

module.exports = router;
