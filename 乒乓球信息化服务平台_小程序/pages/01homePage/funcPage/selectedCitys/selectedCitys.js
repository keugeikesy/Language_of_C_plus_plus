Page({
    data: {
        hotCitys: [
            '南阳',
            '信阳',
            '武汉',
            '郑州',
            '安阳',
        ],
        nowCityNames: '未选择',
    },
    selectCity: function(e){
        var citys = e.currentTarget.dataset.city;
        wx.setStorageSync('saveCityName', citys);
        wx.switchTab({
          url: '/pages/01homePage/gym/gym',
        });
    },
    onShow: function(){
        var nowCity = wx.getStorageSync('saveCityName');
        if(nowCity)
        {
            this.setData({
                nowCityNames: nowCity
            })
        }
    }

})