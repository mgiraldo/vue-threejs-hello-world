<template>
  <object3d v-bind="$attrs">
    <mesh name="Cube">
      <geometry type="Box" :args="[size, size, size]"></geometry>
      <material type="MeshBasic">
        <texture
          :url="
            // replace with `/textures/${texture}.png` to use locally
            `https://raw.githubusercontent.com/mgiraldo/vue-threejs-hello-world/master/public/textures/${texture}.png`
          "
        ></texture>
      </material>
    </mesh>
  </object3d>
</template>

<script>
export default { props: { size: Number, texture: String } }
</script>

<style lang="scss" scoped></style>
