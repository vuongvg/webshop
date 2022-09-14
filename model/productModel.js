const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
   {
      reviewSku: String,
      url: String,
      id: String,
      front_image: {
         type: Object,
         required: true,
      },
      back_image: {
         type: Object,
         required: true,
      },
      brand: {
         type: Object,
         required: true,
      },
      color: {
         type: Array,
         required: true,
      },
      imageColor: {
         type: Array,
      },
      size: {
         type: Array,
         default: ["L", "M", "S", "XL", "XXL"],
      },
      categories: {
         type: Array,
         required: true,
      },
      images: {
         type: Array,
         required: true,
      },
      name: {
         type: String,
         minlength: [4, "Name can not be less than 4 characters"],
         maxlength: [50, "Name can not be more than 50 characters"],
         required: true,
      },
      slug: {
         type: String,
         required: true,
      },
      featured: {
         type: Boolean,
         default: false,
      },
      on_sale: {
         type: Boolean,
         default: false,
      },
      discount: {
         type: Number,
         default: 0,
      },
      price: {
         type: Number,
         required: true,
      },
      regular_price: {
         type: Number,
         required: true,
      },
      rating: {
         type: Number,
         default: 0,
      },
      rating_count: {
         type: Number,
         default: 0,
      },
      stock_quantity: {
         type: Number,
         required: true,
      },
      sell_quantity: {
         type: Number,
         default: 0,
      },
      tags: {
         type: String,
      },
      key_search: {
         type: String,
      },
      guide: {
         type: String,
         default:
            '<table class="table table-pane mb-0">\n<tbody>\n<tr class="bg-color">\n<th class="my-2">US Sizes</th>\n<td>6</td>\n<td>6.5</td>\n<td>7</td>\n<td>8</td>\n<td>8.5</td>\n<td>9</td>\n<td>9.5</td>\n<td>10</td>\n<td>10.5</td>\n<td>11</td>\n</tr>\n<tr>\n<th>Euro Sizes</th>\n<td>39</td>\n<td>39</td>\n<td>40</td>\n<td>40-41</td>\n<td>41</td>\n<td>41-42</td>\n<td>42</td>\n<td>42-43</td>\n<td>43</td>\n<td>43-44</td>\n</tr>\n<tr class="bg-color">\n<th>UK Sizes</th>\n<td>5.5</td>\n<td>6</td>\n<td>6.5</td>\n<td>7</td>\n<td>7.5</td>\n<td>8</td>\n<td>8.5</td>\n<td>9</td>\n<td>10.5</td>\n<td>11</td>\n</tr>\n<tr>\n<th>Inches</th>\n<td>9.25&#8243;</td>\n<td>9.5&#8243;</td>\n<td>9.625&#8243;</td>\n<td>9.75&#8243;</td>\n<td>9.9735&#8243;</td>\n<td>10.125&#8243;</td>\n<td>10.25&#8243;</td>\n<td>10.5&#8243;</td>\n<td>10.765&#8243;</td>\n<td>10.85</td>\n</tr>\n<tr class="bg-color">\n<th>CM</th>\n<td>23.5</td>\n<td>24.1</td>\n<td>24.4</td>\n<td>25.4</td>\n<td>25.7</td>\n<td>26</td>\n<td>26.7</td>\n<td>27</td>\n<td>27.3</td>\n<td>27.5</td>\n</tr>\n</tbody>\n</table>\n',
      },
      specifications: {
         type: String,
         default:
            '<p class="font-light">The Model is wearing a white blouse from our stylist&#8217;s collection, see the image for a mock-up of what the actual blouse would look like.it has text written on it in a black cursive language which looks great on a white color.</p>\n<div class="table-responsive">\n<table class="table table-part">\n<tbody>\n<tr>\n<th>Product Dimensions</th>\n<td>15 x 15 x 3 cm; 250 Grams</td>\n</tr>\n<tr>\n<th>Date First Available</th>\n<td>5 April 2021</td>\n</tr>\n<tr>\n<th>Manufacturer‏</th>\n<td>Aditya Birla Fashion and Retail Limited</td>\n</tr>\n<tr>\n<th>ASIN</th>\n<td>B06Y28LCDN</td>\n</tr>\n<tr>\n<th>Item model number</th>\n<td>AMKP317G04244</td>\n</tr>\n<tr>\n<th>Department</th>\n<td>Men</td>\n</tr>\n<tr>\n<th>Item Weight</th>\n<td>250 G</td>\n</tr>\n<tr>\n<th>Item Dimensions LxWxH</th>\n<td>15 x 15 x 3 Centimeters</td>\n</tr>\n<tr>\n<th>Net Quantity</th>\n<td>1 U</td>\n</tr>\n<tr>\n<th>Included Components‏</th>\n<td>1-T-shirt</td>\n</tr>\n<tr>\n<th>Generic Name</th>\n<td>T-shirt</td>\n</tr>\n</tbody>\n</table>\n</div>\n',
      },
      question_and_answers: {
         type: Array,
         default: [
            {
               question: "Is It Compatible With All WordPress Themes?",
               answer:
                  "If you want to see a demonstration version of the premium plugin, you can see that in this page. If you want to see a demonstration version of the premium plugin, you can see that in this page. If you want to see a demonstration version of the premium plugin, you can see that in this page.",
            },
            {
               question: "How Can I Try The Full-Featured Plugin?",
               answer:
                  "Compatibility with all themes is impossible, because they are too many, but generally if themes are developed according to WordPress and WooCommerce guidelines, YITH plugins are compatible with them. Compatibility with all themes is impossible, because they are too many, but generally if themes are developed according to WordPress and WooCommerce guidelines, YITH plugins are compatible with them.",
            },
            {
               question: "Is It Compatible With All WordPress Themes?",
               answer:
                  "Nec et sapien quam eius architecto. Recusandae totam lorem accusantium dolore. Excepturi totam taciti diam distinctio tempora bibendum saepe aspernatur reiciendis dolor curae eius distinctio inventore auctor lobortis earum! Sapiente mauris curabitur, magni mus senectus conubia, eiusmod cupidatat cras incididunt earum deleniti provident molestiae reprehenderit consequuntur est harum non quia deserunt? Amet similique soluta.",
            },
         ],
      },
      description: {
         type: String,
         default:
            '<div class="part">\n<h4 class="inner-title mb-2">Give You A Complete Account Of The System</h4>\n<p class="font-light">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure.</p>\n</div>\n<div class="row g-3 align-items-center">\n<div class="col-lg-8">\n<p class="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, autem nemo? Tempora vitae assumenda laudantium unde magni, soluta repudiandae quam, neque voluptate deleniti consequatur laboriosam veritatis? Tempore dolor molestias voluptatum! Minima possimus, pariatur sed, quasi provident dolorum unde molestias, assumenda consequuntur odit magni blanditiis obcaecati? Ea corporis odit dolorem fuga, fugiat soluta consequuntur magni.</p>\n<div class="part mt-3">\n<h5 class="inner-title mb-2">Fabric:</h5>\n<p class="font-light">Art silk is manufactured by synthetic fibres like rayon. It\'s light in weight and is soft on the skin for comfort in summers.Art silk is manufactured by synthetic fibres like rayon. It\'s light in weight and is soft on the skin for comfort in summers.</p>\n<p class="font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s</p>\n</div>\n</div>\n<div class="col-lg-8 order-lg-2 mt-4">\n<p class="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, autem nemo? Tempora vitae assumenda laudantium unde magni, soluta repudiandae quam, neque voluptate deleniti consequatur laboriosam veritatis? Tempore dolor molestias voluptatum! Minima possimus, pariatur sed, quasi provident dolorum unde molestias, assumenda consequuntur odit magni blanditiis obcaecati? Ea corporis odit dolorem fuga, fugiat soluta consequuntur magni.</p>\n<div class="part mt-3">\n<p class="font-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio repellat numquam perspiciatis eum quis ab, sed dicta tenetur fugit culpa, aut distinctio deserunt quisquam ipsam reprehenderit iure? Adipisci, optio enim? Voluptates voluptatum neque id ad commodi quisquam dolorem vitae inventore quasi! Officiis facere, iusto tempore atque magnam voluptas. Architecto laboriosam deleniti hic veritatis nesciunt. Aut officia quasi inventore et. Debitis.</p>\n</div>\n</div>\n</div>\n',
      },
      short_description: {
         type: String,
         default:
            "<p>Labore nam maecenas ultricies odio parturient! Illum maecenas bibendum iusto voluptas accumsan proident nobis! Faucibus, ultricies, quia cupidatat? Suscipit distinctio nulla! Viverra luctus. Eu, ligula, tempora, et lorem, nonummy quia veniam bibendum. Interdum dolores aliquip odio, dui. Harum illo? Pede voluptatem iusto, quibusdam inventore cras aliqua itaque illo porttitor egestas dolorum nemo exercitationem senectus tortor lacinia morbi arcu ullam accumsan! Integer eu explicabo, nostrum auctor, faucibus, minim orci ipsum tempora delectus tellus, quod aliqua urna, commodi lacus! Quo viverra cupidatat imperdiet reprehenderit nobis eget? Donec mi nunc pariatur qui debitis, porttitor rerum enim ligula habitant, nibh. Elementum porttitor pede reprehenderit.</p>\n",
      },
   },
   { timestamps: true, versionKey: false }
);

const Product =new mongoose.model("Product", productSchema);
module.exports = Product;
