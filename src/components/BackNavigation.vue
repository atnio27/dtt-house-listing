<template>
  <div class="back-navigation">
    <router-link to="/houses" class="back-link">
      <img src="@/assets/icons/ic_back_grey@3x.png" alt="Back" class="icon" />
      <span>Back to overview</span>
    </router-link>
  </div>
</template>

<style>
.back-navigation {
  margin-bottom: 20px;

  .back-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--secondary-text);
    text-decoration: none;
    font-weight: 600;
  }
}
</style>
