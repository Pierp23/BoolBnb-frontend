<script >
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<template>
  <header class="mb-5 shadow p-3 mb-5 bg-body-tertiary">
    <div class="container-fluid">
      <div class="row px-4 align-items-center">
        <div class="col logo">
          <a href="http://localhost:5174">
            <img src="../assets/img/logo_ultimate.png" alt="">
          </a>
        </div>
        <div class="col logo-complete text-center">
          <img src="../assets/img/logo_completo.png" alt="">
        </div>
        <div class="col text-end">
          <a href="http://127.0.0.1:8000/login">
            <button type="submit" class="btn btn-logout">
              <div class="d-flex align-items-center fw-bold">
                <div class="text-out-lg d-none d-sm-block">
                  Log In
                </div>
                <div class="icon-out-lg">
                  <img src="../assets/img/user_icon.png" alt="" class="user-logo img-fluid d-line">
                </div>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/main";
@import "../../node_modules/rfs/scss";

header {
  position: sticky;
  top: 0;
  z-index: 100;
    .row {
  .logo-complete {
    img {
      width: 150px;
    }
  }

  .logo {
    img {
      width: 40px;
    }
  }

  .btn-logout {
    border-radius: 20px;

    &:hover {
      -webkit-box-shadow: -1px 7px 16px 2px rgba(0, 0, 0, 0.29);
      box-shadow: -1px 7px 16px 2px rgba(0, 0, 0, 0.29);
    }

    .text-out-lg {
      color: #7f7f7f;
    }

    .icon-out-lg {
      img {
        width: 25px;
        margin-left: 5px;
      }
    }
  }
} 

}

h1 {
  @include font-size(4rem);
}



//MEDIA-QUERY

//LAPTOP
@media screen and (max-width: 2000px) {

}

//MOBILE 
@media screen and (min-width: 375px) and (max-width: 576px) {
  header {
    .container-fluid {
      .row {
        .logo {
          img{
            width: 30px;
          }
        }
        .logo-complete {
          img {
            width: 120px;
          }
        }
        .icon-out-lg {
          img {
            width: 30px;
          }
        }
      }
    }
  }
}

</style>
