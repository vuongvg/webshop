const dataDb = require("./products.json");

const editData = () =>
   dataDb.map((item, index) => ({
      ...item,
      categories: [
         item.categories[0],
         { ...item.categories[item.categories.length - 1], slug: item.categories[item.categories.length - 1].slug + "-" + item.categories[0].slug },
      ],
      short_description:
         "<p>Labore nam maecenas ultricies odio parturient! Illum maecenas bibendum iusto voluptas accumsan proident nobis! Faucibus, ultricies, quia cupidatat? Suscipit distinctio nulla! Viverra luctus. Eu, ligula, tempora, et lorem, nonummy quia veniam bibendum. Interdum dolores aliquip odio, dui. Harum illo? Pede voluptatem iusto, quibusdam inventore cras aliqua itaque illo porttitor egestas dolorum nemo exercitationem senectus tortor lacinia morbi arcu ullam accumsan! Integer eu explicabo, nostrum auctor, faucibus, minim orci ipsum tempora delectus tellus, quod aliqua urna, commodi lacus! Quo viverra cupidatat imperdiet reprehenderit nobis eget? Donec mi nunc pariatur qui debitis, porttitor rerum enim ligula habitant, nibh. Elementum porttitor pede reprehenderit.</p>\n",
   }));

// const editData = () => {
//    return dataDb.map(
//       ({
//          back_image,
//          front_image,
//          guide,
//          specifications,
//          question_and_answers,
//          description,
//          short_description,
//          color,
//          brand,
//          size,
//          categories,
//          date_created,
//          dimensions,
//          id,
//          images,
//          name,
//          list_variation,
//          on_sale,
//          discount,
//          permalink,
//          price,
//          price_html,
//          rating,
//          rating_count,
//          regular_price,
//          related_ids,
//          slug,
//          sale_price,
//          stock_quantity,
//          tags,
//          _links,

//       }) => {
//          return {
//             name,
//             back_image,
//             front_image,
//             guide,
//             specifications,
//             question_and_answers,
//             description,
//             short_description,
//             color,
//             brand,
//             size,
//             categories,
//             date_created,
//             dimensions,
//             id,
//             images,
//             list_variation,
//             on_sale,
//             discount,
//             permalink,
//             price,
//             price_html,
//             rating,
//             rating_count,
//             regular_price,
//             related_ids,
//             slug,
//             sale_price,
//             stock_quantity,
//             tags,
//             _links,
//             key_search:`${name.toLocaleLowerCase()}, ${brand.slug.toLocaleLowerCase()}, ${categories.map(({slug})=>slug.toLocaleLowerCase()).join(', ')}`,
//          };
//       }
//    );
// };

module.exports = { editData };
