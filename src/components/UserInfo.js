class UserInfo {
    constructor({selectorName, selectorAbout, selectorAvatar}) {
        this._profileName = document.querySelector(selectorName);
        this._profileAbout = document.querySelector(selectorAbout);
        this._profileAvatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        const data = {};
        data.name = this._profileName.textContent;
        data.about = this._profileAbout.textContent;
        return data;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name; 
        this._profileAbout.textContent = data.about;
        this._profileAvatar.src = data.avatar;  
    }
}

export { UserInfo }