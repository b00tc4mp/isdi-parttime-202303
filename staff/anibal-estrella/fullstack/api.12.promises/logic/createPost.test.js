const createPost = require('./createPost')

createPost(
    'user-1',
    'Mauris sollicitudin fermentum libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Aenean imperdiet.', 'https://picsum.photos/1500?random=1',
    error => {
        if (error) {
            console.error(error)
            return
        }
        console.log('post created!')
    })