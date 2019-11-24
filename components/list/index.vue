<template>
  <div>
      <header class="Type">
          <nav class="Type-nav">
                <ul>
                    <li class="TypeList">
                        <a href="/">最新</a>
                    </li>
                </ul>
          </nav>
      </header>
      <List item-layout="vertical">
            <ListItem v-for="item in data" :key="item.title" class="ListItem">
                <ListItemMeta>
                    <template slot="title">
                        <a href="/">首页开发中,尽情期待</a>
                    </template>
                    <template slot="description">
                        <span>{{item.description}}</span>
                    </template>
                </ListItemMeta>

                <template slot="action">
                    <li>
                        <Icon type="md-contact" size='14'/> <span>???</span>
                    </li>
                    <li>
                        <Icon type="md-thumbs-up" size='14'/> <span>???</span>
                    </li>
                    <li>    
                        <Icon type="ios-chatboxes-outline" /> <span>????</span>
                    </li>
                    <li>
                        <Icon type="md-time" size='14'/><span>?????</span>
                    </li>
                </template>
                <template slot="extra">
                    <span></span>
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
                        title: '首页开发中,尽情期待1',
                        description: '?????',
                        content: '?????,'
                    },
                   {
                        title: '首页开发中,尽情期待2',
                        description: '?????',
                        content: '?????,'
                    },
                    {
                        title: '首页开发中,尽情期待3',
                        description: '?????',
                        content: '?????,'
                    },
                    {
                        title: '首页开发中,尽情期待4',
                        description: '?????',
                        content: '?????,'
                    },
                   {
                        title: '首页开发中,尽情期待5',
                        description: '?????',
                        content: '?????,'
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