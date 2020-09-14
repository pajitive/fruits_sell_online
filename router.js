

module.exports = app =>{
    app.use('/api/categories', require('./api/categories'));
    app.use('/api/products', require('./api/products'));
    app.use('/api/user', require('./api/user'));
}