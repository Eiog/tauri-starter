<script setup lang="ts">
const list = ref([
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐คฃ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฅฐ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐คช',
  '๐คจ',
  '๐ง',
  '๐ค',
  '๐',
  '๐คฉ',
  '๐ฅณ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  'โน๏ธ',
  '๐ฃ',
  '๐',
  '๐ซ',
  '๐ฉ',
  '๐ฅบ',
  '๐ข',
  '๐ญ',
  '๐ค',
  '๐ ',
  '๐ก',
  '๐คฌ',
  '๐คฏ',
  '๐ณ',
  '๐ฅต',
  '๐ฅถ',
  '๐ฑ',
  '๐จ',
  '๐ฐ',
  '๐ฅ',
  '๐',
  '๐ค',
  '๐ค',
  '๐คญ',
  '๐คซ',
  '๐คฅ',
  '๐ถ',
  '๐',
  '๐',
  '๐ฌ',
  '๐',
  '๐ฏ',
  '๐ฆ',
  '๐ง',
  '๐ฎ',
  '๐ฒ',
  '๐ฅฑ',
  '๐ด',
  '๐คค',
  '๐ช',
  '๐ต',
  '๐ค',
  '๐ฅด',
  '๐คข',
  '๐คฎ',
  '๐คง',
  '๐ท',
  '๐ค',
  '๐ค',
  '๐ค',
  '๐ค ',
  '๐',
  '๐ฟ',
  '๐น',
  '๐บ',
  '๐คก',
  '๐ฉ',
  '๐ป',
  '๐',
  'โ ๏ธ',
  '๐ฝ',
  '๐พ',
  '๐ค',
  '๐',
  '๐บ',
  '๐ธ',
  '๐น',
  '๐ป',
  '๐ผ',
  '๐ฝ',
  '๐',
  '๐ฟ',
  '๐พ',
])
const handleAdd = () => {
  const i = Math.round(Math.random() * list.value.length)
  list.value.splice(
    i,
    0,
    list.value[Math.round(Math.random() * list.value.length)],
  )
}
const handleRemove = (index: number) => {
  list.value.splice(index, 1)
}
</script>

<template>
  <div wfull>
    <TransitionGroup relative flex="~ wrap" tag="div" name="fade">
      <div
        key="add"
        w10
        h10
        rounded-full
        flex-center
        cursor-pointer
        transition-colors
        text-2xl
        relative
        bg="white hover:gray2"
        @click="handleAdd"
      >
        <i i-ri-add-fill />
      </div>
      <div
        v-for="(item, index) in list"
        :key="item"
        w10
        h10
        rounded-full
        flex-center
        cursor-pointer
        transition-colors
        text-2xl
        relative
        bg="white hover:gray2"
      >
        <div
          absolute
          inset-0
          flex-center
          transition="colors opacity"
          bg="white/0 hover:white/100"
          opacity0
          hover="opacity100"
          @click="handleRemove(index)"
        >
          <i i-ri-close-fill />
        </div>
        {{ item }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="less">
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. ๅฃฐๆ่ฟๅฅๅ็ฆปๅผ็็ถๆ */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* 3. ็กฎไฟ็ฆปๅผ็้กน็ฎ่ขซ็งป้คๅบไบๅธๅฑๆต
      ไปฅไพฟๆญฃ็กฎๅฐ่ฎก็ฎ็งปๅจๆถ็ๅจ็ปๆๆใ */
.fade-leave-active {
  position: absolute;
}
</style>
