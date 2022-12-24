export const bunWithId = {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    dragId: "d8696ead-10ff-4ba8-ab3b-8d89f87190b1",
}

export const ingredientWithID = {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
    dragId: "478905cc-363b-45c1-b842-71b55fcb2587",
}

export const ingredientWithoutID = {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
}

export const userMock = {
    email: '123@321.ru',
    name: 'Aleksey'
}


export const successfullAuthMock = {
    success: true,
    user: {email: 'some-email', name: 'some-name'},
    accessToken: '1232',
    refreshToken: '123'
}

export const orderInfoMock = {
    _id: "63a34efd99a25c001cd6bb63",
    ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c7",
    ],
    status: 'done',
    name: "Бессмертный флюоресцентный бургер",
    createdAt: "2022-12-21T18:22:53.004Z",
    updatedAt: "2022-12-21T18:22:53.807Z",
    number: 35178,
}