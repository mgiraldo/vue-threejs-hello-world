<template>
  <div id="demo">
    <renderer :size="size">
      <dat-gui :setup="uiSetup" :model="ui"></dat-gui>
      <scene>
        <orbit-controls :position="ui.camera" :rotation="{ x: 2, y: 0, z: 3 }">
          <camera></camera>
          <audio-listener></audio-listener>
        </orbit-controls>
        <light
          :hex="0xefefff"
          :intensity="2"
          :position="{ x: 50, y: 50, z: 50 }"
        ></light>
        <light
          :hex="0xefefff"
          :intensity="2"
          :position="{ x: -50, y: -50, z: -50 }"
        ></light>

        <div :key="ui.sysKey">
          <movement-system>
            <mass-object
              :rv0="{ x: 2, y: 2 }"
              :v0="{ x: 10 }"
              :f="{ x: -3, y: -2 }"
              :m="1"
            >
              <cube texture="cobblestone" :size="1"></cube>
            </mass-object>
            <mass-object
              :rv0="{ x: 2, z: 2 }"
              :v0="{ z: 20 }"
              :f="{ y: -1, z: -8 }"
              :m="1.2"
            >
              <cube texture="diamond" :size="1.2"></cube>
            </mass-object>
            <movement-object
              :rv0="{ x: 2, z: 2 }"
              :v0="{ x: 15, z: -20 }"
              :a="{ x: -6, y: 0.5, z: 6 }"
            >
              <cube texture="redwool" :size="1.1"></cube>
            </movement-object>
          </movement-system>

          <oimo-world :options="{ gravity: [0, 1, 0] }">
            <space-system :m-scale="10 ** 4">
              <space-object v-for="t in textures" :key="t">
                <oimo-body :options="{ move: true, density: 1 }">
                  <cube :texture="t" :size="1"></cube>
                </oimo-body>
              </space-object>
            </space-system>
          </oimo-world>
        </div>
      </scene>
    </renderer>
  </div>
</template>

<script>
import Cube from '@/components/Cube.vue'

export default {
  components: { Cube },
  data() {
    const ui = this.getModel()
    return {
      textures: ['cobblestone', 'diamond', 'redwool'],
      ui,
      uiSetup: this.setupPanel,
      size: {
        w: window.innerWidth,
        h: window.innerHeight
      }
    }
  },
  created() {
    // hack: loop animation via vue key prop
    setInterval(() => {
      this.ui.sysKey += 1
    }, 7000)
  },
  methods: {
    getModel() {
      const ui = {
        camera: {
          x: 9,
          y: 26,
          z: 20
        },
        ocean: {
          y: -200
        },
        sf03: {
          scale: 1
        }
      }
      return ui
    },
    setupPanel(gui, ui) {
      const fc = gui.addFolder('Camera')
      fc.add(ui.camera, 'x', -50, 50).step(0.01)
      fc.add(ui.camera, 'y', -50, 50).step(0.01)
      fc.add(ui.camera, 'z', -50, 50).step(0.01)
      fc.open()
    }
  }
}
</script>

<style lang="scss" scoped></style>
