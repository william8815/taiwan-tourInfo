import { computed } from "vue";

export default function () {
  const filter = computed(() => {
    return function (image) {
      return image || "https://i.postimg.cc/nz9DxX0W/other-User.png";
    };
  });
  return {
    filter,
  };
}
