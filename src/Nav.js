/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-28 22:33:11
 * @LastEditTime: 2019-09-02 12:05:03
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom';

import './Nav.less';


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

  showNav = roleId =>{
   
    switch (roleId) {
      //程序员测试全页面
      case "17" : 
      return (
        <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        style={{ width: 220, height: '100%' }}
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
          <Menu.Item key="4"><Link to='/Shopcart' className="link">购物车管理</Link></Menu.Item>
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
      );
      //老板只注重订单收入页
      case "4":
        return (
          <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 220 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="shopping-cart" />
                <span>点餐服务</span>
              </span>
            }
          >            
            <Menu.Item key="4"><Link to='/Shopcart' className="link">购物车管理</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/order' className="link">订单管理</Link></Menu.Item>   
          </SubMenu>
          </Menu>
        );
      //经理管理顾客，桌子，菜品
      case "16":
        return (
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
          </Menu>
        );
      //服务员退桌，处理订单状态
      case "3":
        return (
          <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 220 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
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
            key="sub4"
            title={
              <span>
                <Icon type="shopping-cart" />
                <span>点餐服务</span>
              </span>
            }
          >            
            <Menu.Item key="4"><Link to='/Shopcart' className="link">购物车管理</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/order' className="link">订单管理</Link></Menu.Item>   
          </SubMenu>

        </Menu>
        );
      //管理员=>用户，日志
      case "15":
        return (
          <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 220 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
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
        );

        default:
          break;
    } 
  }

  render() {
    let roleId = window.localStorage.getItem("roleId");
    console.log(roleId);
    return (
      <div className='mynav'>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="dark"
          unCheckedChildren="Light"
          className='changeButton'
        />
        <br />
        <br />
        {
            this.showNav(roleId)
        }
          
      </div>
    );
  }
}

export default Nav;