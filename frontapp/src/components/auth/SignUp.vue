<template>
    <div class="div-signup">
        <h2>가입하기</h2>
        <input class="input-signup" type="text" v-model="userid" placeholder="ID"><br>
        <input class="input-signup" type="password" v-model="password" placeholder="Password"><br>
        <p class="p-password" v-show="error.password">{{ error.password }}</p>
        <button class="btn-signup" @click="SignUp()">가입</button>
        <hr class="hr-signup">
        <h5 class="h5-signup" @click="LoginMove()">로그인</h5>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            error: {
                id: "",
                password: "",
            },
            userid: "",
            password: "",
        }
    },
    watch: {
        userid: function () {
            if (this.userid.length === 0) {
                this.error.id = "ID를 입력해주세요"
            } else if (this.userid.length < 4) {
                this.error.id = "최소 4자 이상 입력해주세요"
            } else {
                this.error.id = ""
            }
        },
        password: function () {
            if (this.password.length === 0) {
                this.error.password = "Password를 입력해주세요"
            } else if (this.password.length < 4) {
                this.error.password = "최소 4자 이상 입력해주세요"
            } else {
                this.error.password = ""
            }
        }
    },
    methods: {
        SignUp: function() {
            if (this.userid.length === 0) {
                alert("ID를 입력해주세요!")
                this.error.id = "ID를 입력해주세요"
            } else if (this.userid.length < 4) {
                alert("최소 4자 이상 입력해주세요!")
            } else if (this.password.length === 0) {
                alert("Password를 입력해주세요")
                this.error.password = "Password를 입력해주세요"
            } else if (this.password.length < 4) {
                alert("최소 4자 이상 입력해주세요")
            } else {
                this.$http.post('/api/users/create/', {userid: this.userid, password: this.password})
                    .then((response) => {
                        if (response.data) {
                            alert('Success')
                            sessionStorage.setItem('userinfo', JSON.stringify({userid: response.data.userid}))
                            window.location.href = '/Main';
                        } else {
                            alert('이미 사용중인 ID입니다.')
                        }
                    })
                    .catch(function (error) {
                        alert('error message: ' + error)
                    })
            }
        },
        LoginMove: function() {
            this.$router.push('/Login')
        }
  },
}
</script>

<style lang="scss">
.div-signup {
    margin-top: 80px;
}
.input-signup {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.btn-signup {
    width: 19.5%;
    background-color: green;
    color: white;
    padding: 14px 20px;
    margin: 8px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-signup:hover {
    opacity: 0.7;
}
</style>