import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom';


const { SubMenu }  = Menu;

class Nav extends React.Component {
  state = {
    theme: 'dark',
    current: '1',
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="nav_content">
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 220 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>顾客服务</span>
              </span>
            }
          >
            <Menu.Item key="1"><Link to='/customer' className="link">顾客管理</Link></Menu.Item>          
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="select" />
                <span>桌位服务</span>
              </span>
            }
          >
            <Menu.Item key="2"><Link to='/seat' className="link">桌位管理</Link></Menu.Item>           
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="menu" />
                <span>菜单服务</span>
              </span>
            }
          >
            <Menu.Item key="3"><Link to='/menu' className="link">菜单管理</Link></Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="shopping-cart" />
                <span>点餐服务</span>
              </span>
            }
          >            
            <Menu.Item key="4"><Link to='/shopCart' className="link">购物车管理</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/order' className="link">订单管理</Link></Menu.Item>   
          </SubMenu>
          
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="setting" />
                <span>系统服务</span>
              </span>
            }
          >
            <Menu.Item key="6"><Link to='/log' className="link">日志管理</Link></Menu.Item> 
            <SubMenu key="sub6" title="用户服务">
                <Menu.Item key="7"><Link to='/user' className="link">用户管理</Link></Menu.Item>
                <Menu.Item key="8"><Link to='/role' className="link">角色管理</Link></Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Nav;