<template>
  <div style="border: 2px solid hsla(0,0%,59.2%,.1);">
      <header class="Type">
          <nav class="Type-nav">
                <ul>
                    <li class="TypeList">
                        <a href="/">最新</a>
                    </li>
                    <li class="TypeList">
                        <a href="/">热门</a>    
                    </li>
                </ul>
          </nav>
      </header>
      <List item-layout="vertical">
            <ListItem v-for="item in data" :key="item.title" class="ListItem">
                <ListItemMeta>
                    <template slot="title">
                        <a href="/">Vuex的使用</a>
                    </template>
                    <template slot="description">
                        <span>{{item.description}}</span>
                    </template>
                </ListItemMeta>

                <template slot="action">
                    <li>
                    <Icon type="md-contact" size='14'/> <span>遥近</span>
                    </li>
                    <li>
                        <Icon type="md-thumbs-up" size='14'/> <span>333</span>
                    </li>
                    <li>    
                        <Icon type="ios-chatboxes-outline" /> <span>666</span>
                    </li>
                    <li>
                        <Icon type="md-time" size='14'/><span>2019-10-1</span>
                    </li>
                </template>
                <template slot="extra">
                    <!-- <span></span> -->
                    <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 150px">
                </template>
            </ListItem>
    </List>
  </div>
</template>

<script>
export default {
data () {
            return {
                data: [
                    {
                        title: 'vuex的使用',
                        description: 'vuex是一个集中式的管理状体的工具vuex是一个集中式的管理状体的工具',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 23',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 31',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                     {
                        title: 'This is title 32',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 33',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                ]
            }
        }
}
</script>

<style lang="less" scoped>
.Type{
     padding: 10px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
    .Type-nav {
        display: flex;
        justify-content: flex-start;
       
        ul {
            align-items: center;
            display: flex;
            justify-content: space-between;
        }
        .TypeList{
            list-style: none;
            padding: 0 1.2rem;
            border-right: 1px solid hsla(0,0%,59.2%,.2);
            font-family: 'hotFont';
           a {
               font-size: 14px;
               color: #909090;
               &:hover {
                   color: red;
               }
           }
        }
    }
}
    .ListItem {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0,0,0,.03);
    }
    a {
        color:black;
        &:hover {
            color:black;
            text-decoration: underline;
        }
    }
    span {
        font-size: 12px;
    }
}


h2 {
    font-size: 18px;
}
</style>