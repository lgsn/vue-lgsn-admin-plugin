<!--城市下拉选择-->
<template>
  <div class="g-city-select">

    <Cascader
      v-model="cityValue"
      :show-search="{ filter }"
      :placeholder="placeholder"
      :options="cityData"
      size="large"
      @change="changeCity"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Cascader } from 'ant-design-vue'
export default {
  name: 'GCitySelect',
  components: {
    Cascader
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      cityValue: []
    }
  },
  computed: {
    ...mapGetters(['cityData'])
  },
  watch: {
    value: function() {
      this.cityValue = this.value.code
    }
  },
  methods: {
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    changeCity(value, selectedOptions) {
      const name = selectedOptions.map(v => v.label)
      this.$emit('input', {
        code: value,
        label: name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.g-city-select{
}
</style>
