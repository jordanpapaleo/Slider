const Layout = {
    _appWidthRatio: .95,
    _appHeightRatio: 1
};

Layout.getAbsolutePosition = function(i) {

};

Layout.getViewRatio = function(viewCount, i) {
    this.pageRatios = {
        x: ((window.innerWidth * this._appWidthRatio) / viewCount) * i,
        y: ((window.innerHeight * this._appHeightRatio) / viewCount) * i
    };

    return this.pageRatios;
};

Layout.setAppWidthRatio = function(proportion) {
    if(proportion && proportion !== this._appWidthRatio) {
        this._appWidthRatio = proportion;
    }
};

Layout.getAppWidthRatio = function() {
    return this._appWidthRatio;
};

Layout.setAppHeightRatio = function(proportion) {
    if(proportion && proportion !== this._appHeightRatio) {
        this._appHeightRatio = proportion;
    }
};

Layout.getAppHeightRatio = function() {
    return this._appHeightRatio;
};

export default Layout;
