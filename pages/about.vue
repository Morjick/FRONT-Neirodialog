<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div class="about-page">
    Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Quam accusantium quidem
    iusto ut
    aliquam provident exercitationem laudantium dolorem. Quae hic saepe explicabo fuga totam
    deserunt minus odit alias quisquam error,
    nihil eligendi ipsa perspiciatis animi assumenda excepturi! Ad ab voluptatibus nihil praesent
    ium magnam provident eligendi, ratione dignissimos temporibus, nobis fugiat autem aspernatur
    cupiditate, dolorum eos eveniet!
    Amet accusantium commodi ratione adipisci natus culpa totam maxime delectus ipsa minima in,
    facere quidem deleniti similique et, ut impedit quisquam dicta corporis ex architecto? A qui a
    utem totam officia ipsum fugiat, labore doloribus consequuntur perspiciatis, quae accusantium
    hic itaque officiis ad tenetur blanditiis voluptatem reiciendis accusamus
    saepe id nostrum sint
    modi. Possimus, dolorem. Eveniet aspernatur dolores modi tempora est sit volu
    ptatem quaerat? Op
    tio, dicta! Numquam similique aspernatur sint nihil commodi maxime natus
    rerum deserunt hic distinctio minima qui, sit reprehenderit non tempore amet pr
    aesentium facere
    omnis quibusdam id cumque? Voluptatum laboriosam facilis nemo?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusantium quidem iusto ut
    aliquam provident exercitationem laudantium dolorem. Quae hic saepe explicabo fuga totam
    deserunt minus odit alias quisquam error,
    nihil eligendi ipsa perspiciatis animi assumenda excepturi! Ad ab voluptatibus nihil praesent
    ium magnam provident eligendi, ratione dignissimos temporibus, nobis fugiat autem aspernatur
    cupiditate, dolorum eos eveniet!
    Amet accusantium commodi ratione adipisci natus culpa totam maxime delectus ipsa minima in,
    facere quidem deleniti similique et, ut impedit quisquam dicta corporis ex architecto? A qui a
    utem totam officia ipsum fugiat, labore doloribus consequuntur perspiciatis, quae accusantium
    hic itaque officiis ad tenetur blanditiis voluptatem reiciendis accusamus
    saepe id nostrum sint
    modi. Possimus, dolorem. Eveniet aspernatur dolores modi tempora est sit volu
    ptatem quaerat? Op
    tio, dicta! Numquam similique aspernatur sint nihil commodi maxime natus
    rerum deserunt hic distinctio minima qui, sit reprehenderit non tempore amet pr
    aesentium facere
    omnis quibusdam id cumque? Voluptatum laboriosam facilis nemo?

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusantium quidem iusto ut
    aliquam provident exercitationem laudantium dolorem. Quae hic saepe explicabo fuga totam
    deserunt minus odit alias quisquam error,
    nihil eligendi ipsa perspiciatis animi assumenda excepturi! Ad ab voluptatibus nihil praesent
    ium magnam provident eligendi, ratione dignissimos temporibus, nobis fugiat autem aspernatur
    cupiditate, dolorum eos eveniet!
    Amet accusantium commodi ratione adipisci natus culpa totam maxime delectus ipsa minima in,
    facere quidem deleniti similique et, ut impedit quisquam dicta corporis ex architecto? A qui a
    utem totam officia ipsum fugiat, labore doloribus consequuntur perspiciatis, quae accusantium
    hic itaque officiis ad tenetur blanditiis voluptatem reiciendis accusamus
    saepe id nostrum sint
    modi. Possimus, dolorem. Eveniet aspernatur dolores modi tempora est sit volu
    ptatem quaerat? Op
    tio, dicta! Numquam similique aspernatur sint nihil commodi maxime natus
    rerum deserunt hic distinctio minima qui, sit reprehenderit non tempore amet pr
    aesentium facere
    omnis quibusdam id cumque? Voluptatum laboriosam facilis nemo?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusantium quidem iusto ut
    aliquam provident exercitationem laudantium dolorem. Quae hic saepe explicabo fuga totam
    deserunt minus odit alias quisquam error,
    nihil eligendi ipsa perspiciatis animi assumenda excepturi! Ad ab voluptatibus nihil praesent
    ium magnam provident eligendi, ratione dignissimos temporibus, nobis fugiat autem aspernatur
    cupiditate, dolorum eos eveniet!
    Amet accusantium commodi ratione adipisci natus culpa totam maxime delectus ipsa minima in,
    facere quidem deleniti similique et, ut impedit quisquam dicta corporis ex architecto? A qui a
    utem totam officia ipsum fugiat, labore doloribus consequuntur perspiciatis, quae accusantium
    hic itaque officiis ad tenetur blanditiis voluptatem reiciendis accusamus
    saepe id nostrum sint
    modi. Possimus, dolorem. Eveniet aspernatur dolores modi tempora est sit volu
    ptatem quaerat? Op
    tio, dicta! Numquam similique aspernatur sint nihil commodi maxime natus
    rerum deserunt hic distinctio minima qui, sit reprehenderit non tempore amet pr
    aesentium facere
    omnis quibusdam id cumque? Voluptatum laboriosam facilis nemo?
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'

export default defineComponent({
  name: 'AboutPage',
  components: { UiBreadcrumbs, },
  props: {},
  setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'О нас',
        path: '/about',
      },
    ]

    return {
      breadcrumbs,
    }
  },
  data: () => ({}),
  computed: {},
  mounted () {},
  methods: {},
})
</script>

<style lang="scss">
// .about-page {}
</style>
