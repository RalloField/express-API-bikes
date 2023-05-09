const pageNotFound = (req,res,next) => {
    res.status(404).send(
        `404 - Page not found.
        <br>
        This is not the page you're looking for.`
    );
};
module.exports = pageNotFound;