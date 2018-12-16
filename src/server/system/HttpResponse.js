const HttpResponse = (function() {
    function HttpResponse(res) {
        this.res = res;
    }
    
    HttpResponse.prototype.success = function(data) {
        this.res.status(200).json({
            status: true,
            responseCode: 200,
            message: "Success",
            data: data
        });
    };
    
    HttpResponse.prototype.badRequest = function(data) {
        this.res.status(400).json({
            status: false,
            responseCode: 400,
            message: "Bad Request",
            data: data
        });
    };
    
    HttpResponse.prototype.unauthorized = function(data) {
        this.res.status(401).json({
            status: false,
            responseCode: 401,
            message: "Unauthorized",
            data: data
        });
    };
    
    HttpResponse.prototype.notFound = function(data) {
        this.res.status(404).json({
            status: false,
            responseCode: 404,
            message: "Not Found",
            data: data
        });
    };

    HttpResponse.prototype.error = function(data) {
        this.res.status(500).json({
            status: false,
            responseCode: 500,
            message: "Internal Server Error",
            data: data
        });
    };

    return HttpResponse;
})();

module.exports = HttpResponse;