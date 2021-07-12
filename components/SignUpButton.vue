<template>
  <div>
    <button type="button" to="/signup" >新規登録</button>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
    };
  },
};
</script>

<style scoped>
button,
router-link {
  display: block;
  width: 170px;
  color: #fff;
  background-color: #ff0000;
  font-family: 筑紫A丸ゴシック;
  font-weight: bold;
  font-size: 21px;
  border: none;
  border-radius: 24px;
  padding: 5px;
  margin: 10px auto;
  cursor: pointer;
}
</style>