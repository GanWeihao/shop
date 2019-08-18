<template>
  <div class="admin">
    <el-container style="width:100%; border: 1px solid #eee; float:left">
      <el-header style="text-align: left; font-size: 20px; width:100%;">
        <el-dropdown style="margin-left:45px">
          <i class="el-icon-s-custom" style="margin-right: 15px"></i>
          <!-- <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu> -->
        </el-dropdown>
        <span>Admin</span>
      </el-header>

      <div class="admin_body">
        <el-aside
          style="background-color:rgb(238, 241, 246);margin:0;padding:0;width:10%;min-height:880px;float:left;"
        >
          <el-menu style="background-color: rgb(238, 241, 246)">
            <el-submenu index="1">
              <template slot="title" >
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="1-1"
                  @click="adduser()"
                  v-loading.fullscreen.lock="loading"
                >添加用户</el-menu-item>
                <el-menu-item index="1-2" @click="user()" v-loading.fullscreen.lock="loading">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="order()" v-loading.fullscreen.lock="loading">订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-c-scale-to-original"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="3-1"
                  @click="addproduct()"
                  v-loading.fullscreen.lock="loading"
                >添加商品</el-menu-item>
                <el-menu-item
                  index="3-2"
                  @click="product()"
                  v-loading.fullscreen.lock="loading"
                >商品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>类别管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="4-1"
                  @click="addcategroy()"
                  v-loading.fullscreen.lock="loading"
                >添加类别</el-menu-item>
                <el-menu-item
                  index="4-2"
                  @click="category()"
                  v-loading.fullscreen.lock="loading"
                >类别列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>其他管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="income()" v-loading.fullscreen.lock="loading">营业收入</el-menu-item>
                <el-menu-item index="5-2" @click="sell()" v-loading.fullscreen.lock="loading">商品销售排行</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="max-width:90%;height:1080;margin:auto;">
          <el-main style="padding:0;margin:auto;">
            <!-- 添加用户 -->
            <div id="_adduser" class="add_user" style="max-height:474px">
              <div class="add_user_div">
                <p>用户名：</p>
                <el-input
                  class="add_user_div_input"
                  style="width:450px"
                  placeholder="请输入用户名(必填)"
                  v-model="username"
                  clearable
                ></el-input>
              </div>
              <div class="add_user_div">
                <p>密码：</p>
                <el-input
                  class="add_user_div_input"
                  style="width:450px"
                  placeholder="请输入密码(必填)"
                  v-model="password"
                  show-password
                ></el-input>
              </div>
              <div class="add_user_div">
                <p>联系方式：</p>
                <el-input
                  class="add_user_div_input"
                  style="width:450px"
                  v-model="phone"
                  placeholder="请输入手机号(必填)"
                  id="mobile"
                  type="text"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  maxlength="11"
                  clearable
                ></el-input>
              </div>
              <div class="add_user_div">
                <p>地址：</p>
                <el-input
                  class="add_user_div_input"
                  style="width:450px"
                  v-model="address"
                  placeholder="请输入地址(必填)"
                  clearable
                ></el-input>
              </div>
              <div class="add_user_div">
                <p>店铺名称：</p>
                <el-input
                  class="add_user_div_input"
                  style="width:450px"
                  placeholder="请输入店铺名称(必填)"
                  v-model="shopname"
                  clearable
                ></el-input>
              </div>
              <div class="add_user_div">
                <p>个人简介：</p>
                <el-input
                  class="add_user_div_input"
                  style="width:450px"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入个人简介(选填)"
                  v-model="comment"
                  clearable
                ></el-input>
              </div>
              <div class="add_user_div">
                <el-button class="add_user_div_button" type="primary" @click="add_user()">添加用户</el-button>
              </div>
            </div>

            <!-- 用户列表 -->
            <div v-if="userlist.length==0">
              <h3>暂无数据</h3>
              <button @click="user()">返回</button>
            </div>

            <div v-if="selectuser_list.length>0" style="padding-bottom:100px">
              <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input
                  style="width:450px;"
                  placeholder="请输入用户编号/联系方式/店铺名称"
                  v-model="usermess"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search" @click="selectbtn_user(usermess)"></el-button>
                </el-input>
              </div>
              <table
                style="padding:0;margin:auto;border-top:1px solid black;border-bottom:1px solid black;"
              >
                <thead>
                  <th>序号</th>
                  <th>用户昵称</th>
                  <th>用户密码</th>
                  <th>联系方式</th>
                  <th>家庭住址</th>
                  <th>店铺名称</th>
                  <th>用户简介</th>
                  <th>用户状态</th>
                  <th>操作</th>
                </thead>
                <tbody>
                  <div id="light" class="white_content_user">
                    <h3>用户详情</h3>
                    <div
                      style="display:flex;flex-direction:column;justify-content:flex-start;margin:auto;width:500px"
                    >
                      <p class="user_p" style="margin-left:0;padding-left:0">用户编号：{{user_up.userId}}</p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        用户昵称：
                        <input type="text" v-model="user_up.userUserName">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        用户密码：
                        <input type="text" v-model="user_up.userPassword">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        联系方式：
                        <input type="text" v-model="user_up.userTelphone">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        家庭住址：
                        <input type="text" v-model="user_up.userAddress">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        店铺名称：
                        <input type="text" v-model="user_up.userShopName">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        用户简介：
                        <input type="text" v-model="user_up.userComment">
                      </p>
                      <p
                        class="user_p"
                        style="margin-left:0;padding-left:0"
                      >用户状态：{{user_up.userStatus}}</p>
                    </div>

                    <el-button type="primary" @click="user_update(user_up.userId)">确定</el-button>
                    <el-button type="info" @click="user_close()" plain>取消</el-button>
                  </div>
                  <div id="fade" class="black_overlay_user"></div>
                  <tr
                    v-for="(item, index) in selectuser_list"
                    v-bind:key="index"
                    style="height:50px;"
                  >
                    <td style="border-top:1px solid black;width:50px;">{{index+1}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userUserName}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userPassword}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userTelphone}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userAddress}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userShopName}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userComment}}</td>
                    <td
                      style="border-top:1px solid black;width:150px;"
                      v-if="item.userStatus==0"
                    >已删除</td>
                    <td style="border-top:1px solid black;width:150px;" v-if="item.userStatus==1">正常</td>
                    <td style="border-top:1px solid black;display:flex;flex-direction:column;">
                      <el-button
                        style="margin:0;padding:0;height:25px;width:80px;"
                        @click="userupbtn(item.userId)"
                      >用户详情</el-button>
                      <el-button
                        style="margin:0;padding:0;height:25px;width:80px;"
                        @click="userbtn(item.userId)"
                      >删除用户</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                style="position: absolute;margin:10px;left:40%;top:700px;"
                background
                @prev-click="userprev"
                @current-change="userpager"
                @next-click="usernext"
                :current-page="userpagepager"
                :page-size="userpageSize"
                layout="total, prev, pager, next"
                :total="userpageTotal"
              ></el-pagination>
            </div>

            <div v-if="userlist.length>0" style="padding-bottom:100px">
              <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input
                  style="width:450px;"
                  placeholder="请输入用户编号/联系方式/店铺名称"
                  v-model="usermess"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search" @click="selectbtn_user(usermess)"></el-button>
                </el-input>
              </div>
              <table
                style="padding:0;margin:auto;border-top:1px solid black;border-bottom:1px solid black;"
              >
                <thead>
                  <th>序号</th>
                  <th>用户昵称</th>
                  <th>用户密码</th>
                  <th>联系方式</th>
                  <th>家庭住址</th>
                  <th>店铺名称</th>
                  <th>用户简介</th>
                  <th>用户状态</th>
                  <th>操作</th>
                </thead>
                <tbody>
                  <div id="light" class="white_content_user">
                    <h3>用户详情</h3>
                    <div
                      style="display:flex;flex-direction:column;justify-content:flex-start;margin:auto;width:500px"
                    >
                      <p class="user_p" style="margin-left:0;padding-left:0">用户编号：{{user_up.userId}}</p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        用户昵称：
                        <input type="text" v-model="user_up.userUserName">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        用户密码：
                        <input type="text" v-model="user_up.userPassword">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        联系方式：
                        <input type="text" v-model="user_up.userTelphone">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        家庭住址：
                        <input type="text" v-model="user_up.userAddress">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        店铺名称：
                        <input type="text" v-model="user_up.userShopName">
                      </p>
                      <p class="user_p" style="margin-left:0;padding-left:0">
                        用户简介：
                        <input type="text" v-model="user_up.userComment">
                      </p>
                      <p
                        class="user_p"
                        style="margin-left:0;padding-left:0"
                      >用户状态：{{user_up.userStatus}}</p>
                    </div>

                    <el-button type="primary" @click="user_update(user_up.userId)">确定</el-button>
                    <el-button type="info" @click="user_close()" plain>取消</el-button>
                  </div>
                  <div id="fade" class="black_overlay_user"></div>
                  <tr v-for="(item, index) in userlist" v-bind:key="index" style="height:50px;">
                    <td style="border-top:1px solid black;width:50px;">{{index+1}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userUserName}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userPassword}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userTelphone}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userAddress}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userShopName}}</td>
                    <td style="border-top:1px solid black;width:150px;">{{item.userComment}}</td>
                    <td
                      style="border-top:1px solid black;width:150px;"
                      v-if="item.userStatus==0"
                    >已删除</td>
                    <td style="border-top:1px solid black;width:150px;" v-if="item.userStatus==1">正常</td>
                    <td style="border-top:1px solid black;display:flex;flex-direction:column;">
                      <el-button
                        style="margin:0;padding:0;height:25px;width:80px;"
                        @click="userupbtn(item.userId)"
                      >用户详情</el-button>
                      <el-button
                        style="margin:0;padding:0;height:25px;width:80px;"
                        @click="userbtn(item.userId)"
                      >删除用户</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                style="position: absolute;margin:10px;left:40%;top:700px;"
                background
                @prev-click="userprev"
                @current-change="userpager"
                @next-click="usernext"
                :current-page="userpagepager"
                :page-size="userpageSize"
                layout="total, prev, pager, next"
                :total="userpageTotal"
              ></el-pagination>
            </div>

            <!-- 订单列表 -->
            <div v-if="order_list.length==0">
              <h3>暂无数据</h3>
              <button @click="order()">返回</button>
            </div>

            <div v-if="order_list.length>0">
              <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input
                  style="width:450px;"
                  placeholder="请输入订单编号"
                  v-model="ordermess"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search" @click="selectbtn_order()"></el-button>
                </el-input>
              </div>
              <table
                style="padding:0;margin:auto;border-top:1px solid black;border-bottom:1px solid black"
              >
                <thead>
                  <th>序号</th>
                  <th>下单用户</th>
                  <th>下单时间</th>
                  <th>订单总价</th>
                  <th>发货状态</th>
                  <th>订单状态</th>
                  <th>订单备注</th>
                  <th>操作</th>
                </thead>
                <tbody>
                  <div id="light" class="white_content_order">
                    <h3>购买详情</h3>
                    <h4>订单编号：{{detailOrderId}}</h4>
                    <div>
                      <table style="margin:auto">
                        <thead>
                          <th style="width:100px">商品编号</th>
                          <th style="width:100px">商品名称</th>
                          <th style="width:100px">商品数量</th>
                          <th style="width:100px">商品单价</th>
                          <th style="width:100px">商品总价</th>
                          <th style="width:100px">商品状态</th>
                          <th style="width:100px">备注</th>
                        </thead>
                        <tbody>
                          <tr v-for="(item2, idx) in order_up" v-bind:key="idx">
                            <td>{{item2.detailId}}</td>
                            <td>{{item2.product.productName}}</td>
                            <td>{{item2.detailProductCount}}{{item2.detailProductUnit}}</td>
                            <td>{{item2.detailProductPrice}}元/{{item2.detailProductUnit}}</td>
                            <td>{{item2.detailTotalPrice}}元</td>
                            <td>{{item2.detailStatus}}</td>
                            <td>{{item2.detailComment}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <el-button type="primary" @click="order_send(detailOrderId)">一键发货</el-button>
                    <el-button type="warning" @click="order_export()" plain>导出订单</el-button>
                    <el-button type="info" @click="order_close()" plain>返回</el-button>
                  </div>
                  <div id="fade" class="black_overlay_order"></div>
                  <tr v-for="(item, index) in order_list" v-bind:key="index" style="height:50px;">
                    <td style="border-top:1px solid black;width:100px">{{index+1}}</td>
                    <td
                      style="border-top:1px solid black;width:150px"
                      v-if="item.user!=null"
                    >{{item.user.userUserName}}</td>
                    <td style="border-top:1px solid black;width:150px" v-if="item.user==null">null</td>
                    <td style="border-top:1px solid black;width:150px">{{item.orderDateTime}}</td>
                    <td style="border-top:1px solid black;width:150px">{{item.orderTotalPrice}}元</td>
                    <td
                      style="border-top:1px solid black;width:150px"
                      v-if="item.orderIsSend==1"
                    >已发货</td>
                    <td
                      style="border-top:1px solid black;width:150px"
                      v-if="item.orderIsSend!=1"
                    >未发货</td>
                    <td style="border-top:1px solid black;width:150px" v-if="item.orderStatus==1">有效</td>
                    <td style="border-top:1px solid black;width:150px" v-if="item.orderStatus!=1">无效</td>
                    <td
                      style="border-top:1px solid black;width:300px;padding-letf:5px;padding-right:5px;"
                    >{{item.orderComment}}</td>
                    <td style="border-top:1px solid black;display:flex;flex-direction:column;">
                      <el-button
                        style="margin:0;padding:0;height:25px;width:80px;"
                        @click="order_drop(item.orderId)"
                      >订单作废</el-button>
                      <el-button
                        style="margin:0;padding:0;height:25px;width:80px;"
                        @click="order_btn(item.orderId)"
                      >订单详情</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                style="position: absolute;margin:10px;left:40%;top:700px;"
                background
                @prev-click="orderprev"
                @current-change="orderpager"
                @next-click="ordernext"
                :current-page="order_pagepager"
                :page-size="order_pageSize"
                layout="total, prev, pager, next"
                :total="order_pageTotal"
              ></el-pagination>
            </div>

            <!-- 添加商品 -->
            <div id="_addproduct" class="add_product" style="width:1080px">
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>产品序列号</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入厂品序列号(必填)"
                    v-model="add_productjs.productCode"
                    clearable
                  ></el-input>
                </div>
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>图片</p>
                  <el-upload
                    action
                    multiple
                    :limit="1"
                    :http-request="uploadHttp0"
                    accept="image/jpeg, image/gif, image/png"
                  >
                    <el-button style="margin-left:3px;width:400px" size="mini" type="primary">选择图片</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>商品名称</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入商品名称(必填)"
                    v-model="add_productjs.productName"
                    clearable
                  ></el-input>
                </div>

                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>规格</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    v-model="add_productjs.productStandard"
                    placeholder="请输入规格(必填)"
                    type="text"
                    clearable
                  ></el-input>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>小单位</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    v-model="add_productjs.productSmallUnit"
                    placeholder="请输入小单位(必填)"
                    clearable
                  ></el-input>
                </div>
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>小单位价格</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入小单位价格(必填)"
                    v-model="add_productjs.productSmallPrice"
                    clearable
                  ></el-input>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>大单位</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入大单位(必填)"
                    v-model="add_productjs.productLargerUnit"
                    clearable
                  ></el-input>
                </div>
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>大单位价格</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入大单位价格(必填)"
                    v-model="add_productjs.productLargerPrice"
                    clearable
                  ></el-input>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>类别</p>
                  <el-select
                    v-model="add_productjs.productCategoryId"
                    @change="select_cateId"
                    style="width:400px"
                    filterable
                    placeholder="请选择类别"
                  >
                    <el-option
                      v-for="item in addpro_catelist"
                      :key="item.categoryId"
                      :label="item.categoryName"
                      :value="item.categoryId"
                    ></el-option>
                  </el-select>
                </div>
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>品牌</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入品牌或品牌编号(必填)"
                    v-model="add_productjs.productBrandId"
                    clearable
                  ></el-input>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:30%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>在销状态</p>
                  <el-select v-model="add_productjs.productIsSale" filterable placeholder="请选择">
                    <el-option
                      v-for="item in addpro_isSale"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>

                <div
                  style="width:30%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>缺货状态</p>
                  <el-select v-model="add_productjs.productIsLack" filterable placeholder="请选择">
                    <el-option
                      v-for="item in addpeo_isLock"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>

                <div
                  style="width:30%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>商品状态</p>
                  <el-select v-model="add_productjs.productStatus" filterable placeholder="请选择">
                    <el-option
                      v-for="item in addpeo_status"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:space-between;">
                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>排序顺序</p>
                  <el-input-number
                    v-model="add_productjs.productOrder"
                    controls-position="right"
                    style="width:400px"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </div>

                <div
                  style="width:45%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
                >
                  <p>大单位规格</p>
                  <el-input
                    class="add_product_div_input"
                    style="width:400px"
                    placeholder="请输入大单位规格(必填)"
                    v-model="add_productjs.productLargerStandard"
                    clearable
                  ></el-input>
                </div>
              </div>
              <div class="add_product_div" style="justify-content:center;">
                <p>建议零售价</p>
                <el-input
                  class="add_product_div_input"
                  style="margin-left:20px;width:200px"
                  placeholder="请输入建议零售价(必填)"
                  v-model="add_productjs.productSuggestPrice"
                  clearable
                ></el-input>
                <p>元</p>
              </div>
              <div class="add_product_div">
                <el-button class="add_product_div_button" type="primary" @click="add_product()">添加商品</el-button>
              </div>
            </div>

            <!-- 商品列表 -->
            <div v-if="pro_list.length==0">
              <h3>暂无数据</h3>
              <button @click="product()">返回</button>
            </div>

            <div v-if="selectpro_list.length>0" style="padding-bottom:100px">
              <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input
                  style="width:450px;"
                  placeholder="请输入商品编号/商品名称"
                  v-model="promess"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search" @click="selectbtn_pro(promess)"></el-button>
                </el-input>
              </div>

              <table
                style="padding:0;margin:auto;border-top:1px solid black;border-bottom:1px solid black;"
              >
                <thead>
                  <th>序号</th>
                  <th>商品图片</th>
                  <th>商品品牌</th>
                  <th>商品名称</th>
                  <th>商品类别</th>
                  <th>商品价格</th>
                  <th>添加时间</th>
                  <th>商品状态</th>
                  <th>是否缺货</th>
                  <th>操作</th>
                </thead>
                <tbody>
                  <div id="light" class="white_content_pro">
                    <h3>商品详情</h3>
                    <p>(点击图片更换)</p>
                    <div
                      style="display:flex;flex-direction:column;justify-content:flex-start;margin:auto"
                    >
                      <el-upload
                        action
                        multiple
                        :limit="1"
                        :show-file-list="false"
                        :http-request="uploadHttp"
                        accept="image/jpeg, image/gif, image/png"
                      >
                        <img
                          :src="'http://www.wxhwg.com:8080/mock/static/'+pro_up.productPhoto"
                          style="height:200px;"
                        >
                      </el-upload>
                      <p
                        class="pro_p"
                        style="margin-left:0;padding-left:0"
                      >商品编号：{{pro_up.productId}}</p>
                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">产品序列号</p>
                        <el-input v-model="pro_up.productCode" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">商品名称</p>
                        <el-input style="width:200px" v-model="pro_up.productName"></el-input>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >规格</p>
                        <el-input v-model="pro_up.productStandard" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">小单位</p>
                        <el-input v-model="pro_up.productSmallUnit" style="width:200px"></el-input>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >小单位价格</p>
                        <el-input v-model="pro_up.productSmallPrice" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">大单位</p>
                        <el-input v-model="pro_up.productLargerUnit" style="width:200px"></el-input>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >大单位价格</p>
                        <el-input v-model="pro_up.productLargerPrice" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">类别编号</p>
                        <el-select
                          v-model="pro_up.productCategoryId"
                          @change="select_cateId"
                          style="width:200px"
                          filterable
                          placeholder="请选择类别"
                        >
                          <el-option
                            v-for="item in addpro_catelist"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId"
                          ></el-option>
                        </el-select>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >品牌</p>
                        <el-input v-model="pro_up.productBrandId" style="width:200px"></el-input>
                      </div>
                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p
                          class="pro_p"
                          style="margin-left:20px;margin-righr:10px;padding-left:0"
                        >在销状态</p>
                        <el-select
                          style="width:100px"
                          v-model="pro_up.productIsSale"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in addpro_isSale"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>

                        <p
                          class="pro_p"
                          style="margin-left:20px;margin-righr:10px;padding-left:0"
                        >缺货状态</p>
                        <el-select
                          style="width:100px"
                          v-model="pro_up.productIsLack"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in addpeo_isLock"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>

                        <p
                          class="pro_p"
                          style="margin-left:20px;margin-righr:10px;padding-left:0"
                        >商品状态</p>
                        <el-select
                          style="width:100px"
                          @change="change"
                          v-model="pro_up.productStatus"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in addpeo_status"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </div>
                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-left:0;padding-left:0">排序顺序</p>
                        <el-input-number
                          v-model="pro_up.productOrder"
                          controls-position="right"
                          style="width:200px"
                          :min="0"
                          :max="10"
                        ></el-input-number>

                        <p class="pro_p" style="margin-left:0;padding-left:0">大单位规格</p>
                        <el-input v-model="pro_up.productLargerStandard" style="width:200px"></el-input>
                      </div>
                      <div>
                        <p class="pro_p" style="margin-left:0;padding-left:0">
                          建议零售价：
                          <el-input v-model="pro_up.productSuggestPrice" style="width:200px"></el-input>
                        </p>
                      </div>
                    </div>

                    <el-button type="primary" @click="pro_update()">确定</el-button>
                    <el-button @click="pro_close()">取消</el-button>
                  </div>
                  <div id="fade" class="black_overlay_pro"></div>
                  <tr v-for="(item, index) in selectpro_list" v-bind:key="index">
                    <td style="border-top:1px solid;width:100px">{{index+1}}</td>
                    <td style="border-top:1px solid;width:100px;max-height:60px;">
                      <img
                        :src="'http://www.wxhwg.com:8080/mock/static/'+item.productPhoto"
                        style="height:50px;margin-top:5px"
                      >
                    </td>

                    <td style="border-top:1px solid;width:100px">{{item.productBrandId}}</td>
                    <td style="border-top:1px solid;width:150px">{{item.productName}}</td>
                    <td style="border-top:1px solid;width:100px" v-if="item.category==null">null</td>
                    <td
                      style="border-top:1px solid;width:100px"
                      v-if="item.category!=null"
                    >{{item.category.categoryName}}</td>

                    <td style="border-top:1px solid;width:100px">{{item.productSmallPrice}}</td>
                    <td style="border-top:1px solid;width:200px">{{item.productDateTime}}</td>
                    <td style="border-top:1px solid;width:100px" v-if="item.productStatus!=1">已删除</td>
                    <td style="border-top:1px solid;width:100px" v-if="item.productStatus==1">正常</td>
                    <td style="border-top:1px solid;width:100px">
                      <el-checkbox
                        v-model="item.productIsLack"
                        @change="pro_isLack(item.productId,item.productIsLack)"
                      ></el-checkbox>
                    </td>
                    <td
                      style="border-top:1px solid;width:100px;display:flex;flex-direction:column;justify-content:center;"
                    >
                      <el-button
                        style="margin:auto;padding:0;min-height:30.5px;width:80px;"
                        @click="pro_upbtn(item.productId)"
                      >商品详情</el-button>
                      <el-button
                        style="margin:auto;padding:0;min-height:30.5px;width:80px;"
                        @click="pro_btn(item.productId)"
                      >删除商品</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                style="position: absolute;margin:10px;left:40%;top:700px;"
                background
                @prev-click="proprev"
                @current-change="propager"
                @next-click="pronext"
                :current-page="pro_pagepager"
                :page-size="pro_pageSize"
                layout="total, prev, pager, next"
                :total="pro_pageTotal"
              ></el-pagination>
            </div>

            <div v-if="pro_list.length>0" style="padding-bottom:100px">
              <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input
                  style="width:450px;"
                  placeholder="请输入商品编号/商品名称"
                  v-model="promess"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search" @click="selectbtn_pro(promess)"></el-button>
                </el-input>
              </div>

              <table
                style="padding:0;margin:auto;border-top:1px solid black;border-bottom:1px solid black;"
              >
                <thead>
                  <th>序号</th>
                  <th>商品图片</th>
                  <th>商品品牌</th>
                  <th>商品名称</th>
                  <th>商品类别</th>
                  <th>商品价格</th>
                  <th>添加时间</th>
                  <th>商品状态</th>
                  <th>是否缺货</th>
                  <th>操作</th>
                </thead>
                <tbody>
                  <div id="light" class="white_content_pro">
                    <h3>商品详情</h3>
                    <p>(点击图片更换)</p>
                    <div
                      style="display:flex;flex-direction:column;justify-content:flex-start;margin:auto"
                    >
                      <el-upload
                        action
                        multiple
                        :limit="1"
                        :show-file-list="false"
                        :http-request="uploadHttp"
                        accept="image/jpeg, image/gif, image/png"
                      >
                        <img
                          :src="'http://www.wxhwg.com:8080/mock/static/'+pro_up.productPhoto"
                          style="height:200px;"
                        >
                      </el-upload>
                      <p
                        class="pro_p"
                        style="margin-left:0;padding-left:0"
                      >商品编号：{{pro_up.productId}}</p>
                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">产品序列号</p>
                        <el-input v-model="pro_up.productCode" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">商品名称</p>
                        <el-input style="width:200px" v-model="pro_up.productName"></el-input>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >规格</p>
                        <el-input v-model="pro_up.productStandard" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">小单位</p>
                        <el-input v-model="pro_up.productSmallUnit" style="width:200px"></el-input>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >小单位价格</p>
                        <el-input v-model="pro_up.productSmallPrice" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">大单位</p>
                        <el-input v-model="pro_up.productLargerUnit" style="width:200px"></el-input>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >大单位价格</p>
                        <el-input v-model="pro_up.productLargerPrice" style="width:200px"></el-input>
                      </div>

                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-right:15px;padding-left:0">类别编号</p>
                        <el-select
                          v-model="pro_up.productCategoryId"
                          @change="select_cateId"
                          style="width:200px"
                          filterable
                          placeholder="请选择类别"
                        >
                          <el-option
                            v-for="item in addpro_catelist"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId"
                          ></el-option>
                        </el-select>

                        <p
                          class="pro_p"
                          style="margin-left:30px;margin-right:15px;padding-left:0"
                        >品牌</p>
                        <el-input v-model="pro_up.productBrandId" style="width:200px"></el-input>
                      </div>
                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p
                          class="pro_p"
                          style="margin-left:20px;margin-righr:10px;padding-left:0"
                        >在销状态</p>
                        <el-select
                          style="width:100px"
                          v-model="pro_up.productIsSale"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in addpro_isSale"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>

                        <p
                          class="pro_p"
                          style="margin-left:20px;margin-righr:10px;padding-left:0"
                        >缺货状态</p>
                        <el-select
                          style="width:100px"
                          v-model="pro_up.productIsLack"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in addpeo_isLock"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>

                        <p
                          class="pro_p"
                          style="margin-left:20px;margin-righr:10px;padding-left:0"
                        >商品状态</p>
                        <el-select
                          style="width:100px"
                          @change="change"
                          v-model="pro_up.productStatus"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in addpeo_status"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </div>
                      <div
                        style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin:auto;"
                      >
                        <p class="pro_p" style="margin-left:0;padding-left:0">排序顺序</p>
                        <el-input-number
                          v-model="pro_up.productOrder"
                          controls-position="right"
                          style="width:200px"
                          :min="0"
                          :max="10"
                        ></el-input-number>

                        <p class="pro_p" style="margin-left:0;padding-left:0">大单位规格</p>
                        <el-input v-model="pro_up.productLargerStandard" style="width:200px"></el-input>
                      </div>
                      <div>
                        <p class="pro_p" style="margin-left:0;padding-left:0">
                          建议零售价：
                          <el-input v-model="pro_up.productSuggestPrice" style="width:200px"></el-input>
                        </p>
                      </div>
                    </div>

                    <el-button type="primary" @click="pro_update()">确定</el-button>
                    <el-button @click="pro_close()">取消</el-button>
                  </div>
                  <div id="fade" class="black_overlay_pro"></div>
                  <tr v-for="(item, index) in pro_list" v-bind:key="index">
                    <td style="border-top:1px solid;width:100px">{{index+1}}</td>
                    <td style="border-top:1px solid;width:100px;max-height:60px;">
                      <img
                        :src="'http://www.wxhwg.com:8080/mock/static/'+item.productPhoto"
                        style="height:50px;margin-top:5px"
                      >
                    </td>

                    <td style="border-top:1px solid;width:100px">{{item.productBrandId}}</td>
                    <td style="border-top:1px solid;width:150px">{{item.productName}}</td>
                    <td style="border-top:1px solid;width:100px" v-if="item.category==null">null</td>
                    <td
                      style="border-top:1px solid;width:100px"
                      v-if="item.category!=null"
                    >{{item.category.categoryName}}</td>

                    <td style="border-top:1px solid;width:100px">{{item.productSmallPrice}}</td>
                    <td style="border-top:1px solid;width:200px">{{item.productDateTime}}</td>
                    <td style="border-top:1px solid;width:100px" v-if="item.productStatus!=1">已删除</td>
                    <td style="border-top:1px solid;width:100px" v-if="item.productStatus==1">正常</td>
                    <td style="border-top:1px solid;width:100px">
                      <el-checkbox
                        v-model="item.productIsLack"
                        @change="pro_isLack(item.productId,item.productIsLack)"
                      ></el-checkbox>
                    </td>
                    <td
                      style="border-top:1px solid;width:100px;display:flex;flex-direction:column;justify-content:center;"
                    >
                      <el-button
                        style="margin:auto;padding:0;min-height:30.5px;width:80px;"
                        @click="pro_upbtn(item.productId)"
                      >商品详情</el-button>
                      <el-button
                        style="margin:auto;padding:0;min-height:30.5px;width:80px;"
                        @click="pro_btn(item.productId)"
                      >删除商品</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                style="position: absolute;margin:10px;left:40%;top:700px;"
                background
                @prev-click="proprev"
                @current-change="propager"
                @next-click="pronext"
                :current-page="pro_pagepager"
                :page-size="pro_pageSize"
                layout="total, prev, pager, next"
                :total="pro_pageTotal"
              ></el-pagination>
            </div>

            <!-- 添加类别 -->
            <div id="_addcategory" class="add_category" style="margin-top:30px;">
              <div
                class="add_category_div"
                style="margin-bottom:30px;display:flex;flex-direction:row;justify-content:center;align-items:center;"
              >
                <p>类别名称：</p>
                <el-input
                  class="add_category_div_input"
                  style="width:300px"
                  placeholder="请输入类别名称(必填)"
                  v-model="addcategory_list.categoryName"
                  clearable
                ></el-input>
              </div>
              <div
                class="add_category_div"
                style="margin-bottom:30px;display:flex;flex-direction:row;justify-content:center;align-items:center;"
              >
                <p>类别排序：</p>
                <el-input-number
                  v-model="addcategory_list.categoryOrder"
                  controls-position="right"
                  style="width:300px"
                  :min="0"
                  :max="10"
                ></el-input-number>
              </div>
              <div
                class="add_category_div"
                style="margin-bottom:30px;display:flex;flex-direction:row;justify-content:center;align-items:center;"
              >
                <p>类别状态：</p>
                <el-select
                  v-model="addcategory_list.categoryStatus"
                  style="width:300px"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in addcategory_status"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="add_category_div">
                <el-button
                  style="width:380px"
                  class="add_category_div_button"
                  type="primary"
                  @click="add_category()"
                >添加类别</el-button>
              </div>
            </div>

            <!-- 类别列表 -->
            <div v-if="categorylist.length==0">
              <h3>暂无数据</h3>
              <button @click="category()">返回</button>
            </div>
            <div v-if="categorylist.length>0">
              <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input
                  style="width:450px;"
                  placeholder="请输入类别编号"
                  v-model="categroy_id"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search" @click="select_categroy()"></el-button>
                </el-input>
              </div>
              <table
                style="padding:0;margin:auto;border-top:1px solid black;border-bottom:1px solid black;"
              >
                <thead>
                  <th>类别编号</th>
                  <th>类别名称</th>
                  <th>类别状态</th>
                  <th>类别顺序</th>
                  <th>操作</th>
                </thead>
                <tbody v-for="(item, index) in categorylist" v-bind:key="index">
                  <div id="light" class="white_content_category">
                    <h3>修改类别</h3>
                    <p class="categroy_p">类别编号：{{categroy_up.categoryId}}</p>
                    <p class="categroy_p">
                      类别名称：
                      <input type="text" v-model="categroy_up.categoryName">
                    </p>
                    <p class="categroy_p">
                      类别顺序：
                      <input type="text" v-model="categroy_up.categoryOrder">
                    </p>
                    <p class="categroy_p">
                      类别状态：
                      <input type="text" v-model="categroy_up.categoryStatus">
                    </p>
                    <el-button type="primary" @click="categroy_update(categroy_up.categoryId)">确定</el-button>
                    <el-button type="info" @click="categroy_close()" plain>取消</el-button>
                  </div>
                  <div id="fade" class="black_overlay_category"></div>
                  <tr>
                    <td style="border-top:1px solid black;width:450px">{{item.categoryId}}</td>
                    <td style="border-top:1px solid black;width:150px">{{item.categoryName}}</td>
                    <td
                      style="border-top:1px solid black;width:150px"
                      v-if="item.categoryStatus!=1"
                    >已删除</td>
                    <td
                      style="border-top:1px solid black;width:150px"
                      v-if="item.categoryStatus==1"
                    >正常</td>
                    <td style="border-top:1px solid black;width:150px">
                      <el-input-number
                        v-model="item.categoryOrder"
                        style="width:100px"
                        @change="categoryOrder_Change(item.categoryId,item.categoryName,item.categoryOrder)"
                        controls-position="right"
                        :min="0"
                        :max="10"
                      ></el-input-number>
                    </td>
                    <td
                      style="border-top:1px solid;width:100px;display:flex;flex-direction:column;justify-content:center;"
                    >
                      <el-button
                        style="margin:auto;padding:0;min-height:30.5px;width:80px;"
                        @click="categoryupbtn(item.categoryId)"
                      >类别详情</el-button>
                      <el-button
                        style="margin:auto;padding:0;min-height:30.5px;width:80px;"
                        @click="categorybtn(item.categoryId)"
                      >删除类别</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 其他管理 -->
            <div id="other_income" style="margin-top:1%;">
              <table
                rules="none"
                cellspacing="0"
                style="margin:auto;border-top:1px solid black;border-bottom:1px solid black;width:80%;height:300px;"
              >
                <thead>
                  <th style="height:30px">季度</th>
                  <th style="height:30px">营业收入/万元</th>
                </thead>
                <tbody>
                  <tr v-for="(item,index) of selectTop" v-bind:key="index">
                    <td
                      style="border-top:1px solid black;border-right:1px solid black"
                    >{{item.MONTHS}}</td>
                    <td style="border-top:1px solid black">{{item.SUMER}}</td>
                  </tr>
                </tbody>
              </table>
              <div id="echarts1" style="margin:auto; width:1000px; height:500px"></div>
            </div>

            <div id="other_sell" style="margin-top:1%">
              <table
                rules="none"
                cellspacing="0"
                style="margin:auto;border-top:1px solid black;border-bottom:1px solid black;width:80%;"
              >
                <thead>
                  <th style="height:30px">商品名称</th>
                  <th style="height:30px">销售收入/万元</th>
                </thead>
                <tbody>
                  <tr v-for="(item,index) of topPrice" v-bind:key="index" style="height:50px">
                    <td
                      style="border-top:1px solid black;border-right:1px solid black"
                    >{{item.PRODUCT_NAME}}</td>
                    <td style="border-top:1px solid black">{{item.SUMER}}</td>
                  </tr>
                </tbody>
              </table>
              <div id="echarts2" style="margin:auto; width:1000px; height:500px"></div>
            </div>
          </el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
var url = "http://localhost:8080/lanqiaoshop";
export default {
  name: "admin",
  components: {
    getImgUrl() {
      return "http://www.wxhwg.com:8080/mock/static";
    }
  },
  data() {
    return {
      admin: {},

      upLoadUrl: url + "/upload",
      loading: false,
      checked: false,

      selectuser_list: {},
      userlist: {},
      userpagepager: "",
      userpageSize: "",
      userpageTotal: "",
      user_up: "",
      usermess: "",

      selectpro_list: {},
      pro_list: {},
      pro_pagepager: 1,
      pro_pageSize: "",
      pro_pageTotal: "",
      pro_up: {
        productCode: "",
        productName: "",
        productStandard: "",
        productSmallUnit: "",
        productSmallPrice: "",
        productLargerUnit: "",
        productLargerPrice: "",
        productCategoryId: "",
        productBrandId: "",
        productPhoto: "",
        productIsSale: "",
        productIsLack: "",
        productStatus: "",
        productOrder: "",
        productLargerStandard: "",
        productSuggestPrice: ""
      },
      promess: "",

      categorylist: {},
      categroy_up: {},
      categroy_id: "",

      order_list: {},
      order_pagepager: 1,
      order_pageSize: "",
      order_pageTotal: "",
      order_up: "",
      ordermess: "",
      detailOrderId: "",

      username: "",
      password: "",
      phone: "",
      address: "",
      shopname: "",
      comment: "",

      pro_categroyid: "",
      addpro_catelist: {},
      addpro_isSale: [
        {
          name: "停售",
          value: 0
        },
        {
          name: "在销",
          value: 1
        }
      ],
      addpeo_isLock: [
        {
          name: "缺货",
          value: 0
        },
        {
          name: "有货",
          value: 1
        }
      ],
      addpeo_status: [
        {
          name: "隐藏",
          value: 0
        },
        {
          name: "正常",
          value: 1
        }
      ],
      add_productjs: {
        productCode: "",
        productName: "",
        productStandard: "",
        productSmallUnit: "",
        productSmallPrice: "",
        productLargerUnit: "",
        productLargerPrice: "",
        productCategoryId: "",
        productBrandId: "",
        productPhoto: "",
        productIsSale: "",
        productIsLack: "",
        productStatus: "",
        productOrder: "",
        productLargerStandard: "",
        productSuggestPrice: ""
      },

      addcategory_status: [
        {
          name: "无效",
          value: "0"
        },
        {
          name: "有效",
          value: "1"
        }
      ],

      addcategory_list: {
        categoryName: "",
        categoryOrder: "",
        categoryStatus: ""
      },
      selectTop: [],
      topPrice: []
    };
  },
  mounted() {},
  methods: {
    change(val) {
      console.log(val);
    },
    addcategroy() {
      document.getElementById("other_sell").style.display = "none";
      document.getElementById("other_income").style.display = "none";
      document.getElementById("_adduser").style.display = "none";
      document.getElementById("_addproduct").style.display = "none";
      document.getElementById("_addcategory").style.display = "none";
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.pro_list = {};
        this.categorylist = {};
        this.order_list = {};
        this.userlist = {};
        this.selectuser_list = {};
        this.selectpro_list = {};
        document.getElementById("_addcategory").style.display = "block";
      }, 500);
    },
    add_category() {
      let params = this.$qs.stringify(this.addcategory_list);
      this.$axios
        .post(url + "/api/addleibie/fod", params)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              type: "seccess",
              message: "添加成功！"
            });
            this.addcategory_list = {
              categoryName: "",
              categoryOrder: "",
              categoryStatus: ""
            };
          } else {
            this.$message({
              type: "info",
              message: "添加失败！"
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "添加异常！"
          });
        });
    },
    add_product() {
      let params = this.$qs.stringify(this.add_productjs);
      this.$axios
        .post(url + "/api/insert/product/find", params)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              type: "seccess",
              message: "添加成功！"
            });
            this.add_productjs = {
              productCode: "",
              productName: "",
              productStandard: "",
              productSmallUnit: "",
              productSmallPrice: "",
              productLargerUnit: "",
              productLargerPrice: "",
              productCategoryId: "",
              productBrandId: "",
              productPhoto: "",
              productIsSale: "",
              productIsLack: "",
              productStatus: "",
              productOrder: "",
              productLargerStandard: "",
              productSuggestPrice: ""
            };
          } else {
            this.$message({
              type: "info",
              message: "添加失败！"
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "添加异常！"
          });
        });
    },
    select_cateId() {
      this.add_product.productCategoryId = this.value;
    },
    uploadHttp0(file) {
      var fd = new FormData();
      fd.append("image-file", file.file);
      this.$axios
        .post(url + "/upload", fd)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message({
              type: "seccess",
              message: "上传成功"
            });
            this.add_productjs.productPhoto = res.data.data;
          } else {
            this.$message({
              type: "info",
              message: "上传失败！"
            });
          }
        })
        .catch(res => {
          this.$alert("上传异常", "消息", {
            confirmButtonText: "确定"
          });
        });
    },

    addproduct() {
      document.getElementById("other_sell").style.display = "none";
      document.getElementById("other_income").style.display = "none";
      document.getElementById("_adduser").style.display = "none";
      document.getElementById("_addproduct").style.display = "none";
      document.getElementById("_addcategory").style.display = "none";
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.pro_list = {};
        this.categorylist = {};
        this.order_list = {};
        this.userlist = {};
        this.selectuser_list = {};
        this.selectpro_list = {};
        document.getElementById("_addproduct").style.display = "block";
        this.$axios
          .get(url + "/api/category/list")
          .then(response => {
            console.log(response);
            if (response.data.status == 200) {
              this.addpro_catelist = response.data.data;
            } else {
              this.$alert(response.data.message, "消息", {
                confirmButtonText: "确定"
              });
            }
          })
          .catch(error => {});
      }, 500);
    },

    adduser() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        document.getElementById("other_sell").style.display = "none";
        document.getElementById("other_income").style.display = "none";
        document.getElementById("_adduser").style.display = "none";
        document.getElementById("_addproduct").style.display = "none";
        document.getElementById("_addcategory").style.display = "none";
        this.selectuser_list = {};
        this.selectuser_list = {};
        this.pro_list = {};
        this.categorylist = {};
        this.order_list = {};
        this.userlist = {};
        document.getElementById("_adduser").style.display = "block";
      }, 500);
    },
    add_user() {
      let params = this.$qs.stringify({
        userUserName: this.username,
        userPassword: this.password,
        userTelphone: this.phone,
        userAddress: this.address,
        userShopName: this.shopname,
        userComment: this.comment
      });
      //添加用户
      this.$axios
        .post(url + "/user/add", params)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message({
              type: "seccess",
              message: "添加成功！"
            });
            this.username = "";
            this.password = "";
            this.phone = "";
            this.address = "";
            this.shopname = "";
            this.comment = "";
          } else {
            this.$message({
              type: "info",
              message: "添加失败！"
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "添加异常！"
          });
        });
    },

    order() {
      document.getElementById("other_sell").style.display = "none";
      document.getElementById("other_income").style.display = "none";
      document.getElementById("_adduser").style.display = "none";
      document.getElementById("_addproduct").style.display = "none";
      document.getElementById("_addcategory").style.display = "none";
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.selectuser_list = {};
      this.selectpro_list = {};
      this.pro_list = {};
      this.categorylist = {};
      this.userlist = {};
      let params = this.$qs.stringify({
        pageNum:1,
        pageSize: 10
      });
      //查询所有订单
      this.$axios
        .post(url + "/api/dingdan/find", params)
        .then(response => {
          console.log(response);
          if (response.data.status == 200) {
            this.order_list = response.data.data.list;
            this.order_pagepager = response.data.data.pageNum;
            this.order_pageSize = response.data.data.pageSize;
            this.order_pageTotal = response.data.data.total;
          } else {
            this.$message({
              type: "info",
              message: "查询失败！"
            });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "查询异常！"
          });
        });
    },
    orderpager(value) {
      this.pro_list = {};
      this.categorylist = {};
      this.userlist = {};

      let params = this.$qs.stringify({
        pageNum: value,
        pageSize: 10
      });
 //查询所有订单分页
      this.$axios
        .post(url + "/api/dingdan/find", params)
        .then(response => {
          console.log(response);
          if (response.data.status == 200) {
            this.order_list = response.data.data.list;
            this.order_pagepager = response.data.data.pageNum;
            this.order_pageSize = response.data.data.pageSize;
            this.order_pageTotal = response.data.data.total;
          } else {
            this.$message({
              type: "info",
              message: "查询失败！"
            });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "查询异常！"
          });
        });
    },
    orderprev(value) {
      this.orderpager(value);
    },
    ordernext(value) {
      this.orderpager(value);
    },
    order_btn(id) {
      console.log(id);
      this.detailOrderId = id;
      //根据订单id查询单个订单信息   
      this.$axios
        .get(url + "/api/Dd/fod", {
          params: {
            orderid: id
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.status == 200) {
            if (res.data.data.length > 0) {
              this.order_up = res.data.data;
              document.getElementById("light").style.display = "block";
              document.getElementById("fade").style.display = "block";
            } else {
              this.$message({
                type: "error",
                message: "订单内无商品！"
              });
            }
          }
        })
        .catch(res => {
          console.log(res);
          this.$message({
            type: "error",
            message: "查询异常！"
          });
        });
    },
    order_drop(id) {
      this.$confirm("确认废除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(r => {
          //删除订单   缺少参数（orderid）无法删除
          this.$axios
            .get(url + "/order/invalid", {
              params: {
                orderid: id
              }
            })
            .then(res => {
              if (res.data.status == 200) {
                this.$message({
                  type: "seccess",
                  message: "废除成功！"
                });

                this.pro_list = {};
                this.categorylist = {};
                this.userlist = {};
                let params = this.$qs.stringify({
                  pageNum: this.order_pagepager,
                  pageSize: 10
                });
                this.$axios
                  .post(url + "/api/dingdan/find", params)
                  .then(response => {
                    console.log(response);
                    if (response.data.status == 200) {
                      this.order_list = response.data.data.list;
                      this.order_pagepager = response.data.data.pageNum;
                      this.order_pageSize = response.data.data.pageSize;
                      this.order_pageTotal = response.data.data.total;
                    } else {
                      this.$message({
                        type: "info",
                        message: "查询失败！"
                      });
                    }
                  })
                  .catch(error => {
                    // this.$message({
                    //   type: "error",
                    //   message: "查询异常！"
                    // });
                  });
              } else {
                this.$message({
                  type: "info",
                  message: "废除失败！"
                });
              }
            })
            .catch(res => {
              console.log(res);
            });
        })
        .catch(r => {
          this.$message({
            type: "info",
            message: "取消废除！"
          });
        });
    },
    order_close() {
      this.pro_list = {};
      this.categorylist = {};
      this.userlist = {};

      let params = this.$qs.stringify({
        pageNum: this.order_pagepager,
        pageSize: 10
      });
      this.$axios
        .post(url + "/api/dingdan/find", params)
        .then(response => {
          console.log(response);
          if (response.data.status == 200) {
            this.order_list = response.data.data.list;
            this.order_pagepager = response.data.data.pageNum;
            this.order_pageSize = response.data.data.pageSize;
            this.order_pageTotal = response.data.data.total;
          } else {
            this.$message({
              type: "info",
              message: "查询失败！"
            });
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "查询异常！"
          });
        });
      document.getElementById("light").style.display = "none";
      document.getElementById("fade").style.display = "none";
    },
    order_send(id) {
      this.$confirm("确认发货？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(r => {
          this.$axios
            .get(url + "/order/send", {
              params: {
                orderid: id
              }
            })
            .then(res => {
              if (res.data.status == 200) {
                this.$message({
                  type: "seccess",
                  message: "发货成功！"
                });
                this.pro_list = {};
                this.categorylist = {};
                this.userlist = {};

                let params = this.$qs.stringify({
                  pageNum: this.order_pagepager,
                  pageSize: 10
                });

                this.$axios
                  .post(url + "/api/dingdan/find", params)
                  .then(response => {
                    console.log(response);
                    if (response.data.status == 200) {
                      this.order_list = response.data.data.list;
                      this.order_pagepager = response.data.data.pageNum;
                      this.order_pageSize = response.data.data.pageSize;
                      this.order_pageTotal = response.data.data.total;
                    } else {
                      this.$message({
                        type: "info",
                        message: "查询失败！"
                      });
                    }
                  })
                  .catch(error => {
                    this.$message({
                      type: "error",
                      message: "查询异常！"
                    });
                  });
                document.getElementById("light").style.display = "none";
                document.getElementById("fade").style.display = "none";
              } else {
                this.$message({
                  type: "error",
                  message: "查询失败！"
                });
              }
            })
            .catch(res => {
              this.$message({
                type: "error",
                message: "查询异常！"
              });
            });
        })
        .catch(r => {
          this.$message({
            type: "error",
            message: "取消发货！"
          });
        });
    },
    selectbtn_order() {
      this.order_btn(this.ordermess);
      this.ordermess = "";
    },

    // 商品更换图片
    uploadHttp(file) {
      var fd = new FormData();
      fd.append("image-file", file.file);
      this.$axios
        .post(url + "/upload", fd)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              type: "seccess",
              message: "上传成功，正在更换..."
            });
            this.$axios
              .get(url + "/upload", {
                params: {
                  productId: this.pro_up.productId,
                  photo: res.data.data
                }
              })
              .then(r => {
                this.$message({
                  type: "seccess",
                  message: "更换成功！"
                });

                //查询商品详情
                this.$axios
                  .get(url + "/api/product/find/id", {
                    params: {
                      productId: this.pro_up.productId
                    }
                  })
                  .then(response => {
                    console.log(response);
                    if (response.data.data == null) {
                      this.$message({
                        type: "error",
                        message: "暂无数据!"
                      });
                    } else {
                      this.pro_up = response.data.data;
                    }
                  })
                  .catch(error => {});
              })
              .catch(r => {
                this.$message({
                  type: "seccess",
                  message: "更换异常！"
                });
              });
          } else {
            this.$message({
              type: "info",
              message: "上传失败！"
            });
          }
        })
        .catch(res => {
          this.$alert("上传异常", "消息", {
            confirmButtonText: "确定"
          });
        });
    },
    selectbtn_user(mess) {
      this.$axios
        .get(url + "/user/findById", {
          params: {
            uid: mess
          }
        })
        .then(response => {
          if (response.data.status == 200) {
            if (response.data.data == null) {
              this.$axios
                .get(url + "/user/list", {
                  params: {
                    telphone: mess,
                    pageSize: 10
                  }
                })
                .then(res => {
                  if (res.data.status == 200) {
                    if (res.data.data.list.length == 0) {
                      this.$axios
                        .get(url + "/user/list", {
                          params: {
                            shopName: mess,
                            pageSize: 10
                          }
                        })
                        .then(r => {
                          this.userlist = {};
                          this.selectuser_list = r.data.data.list;
                          this.userpagepager = r.data.data.pageNum;
                          this.userpageSize = r.data.data.pageSize;
                          this.userpageTotal = r.data.data.total;
                        })
                        .catch(r => {});
                    } else {
                      this.userlist = {};
                      this.selectuser_list = res.data.data.list;
                      this.userpagepager = res.data.data.pageNum;
                      this.userpageSize = res.data.data.pageSize;
                      this.userpageTotal = res.data.data.total;
                    }
                  } else {
                  }
                })
                .catch(error => {});
            } else {
              this.user_up = response.data.data;
              document.getElementById("light").style.display = "block";
              document.getElementById("fade").style.display = "block";
            }
          } else {
          }
        })
        .catch(error => {});
    },
    user() {
      document.getElementById("other_sell").style.display = "none";
      document.getElementById("other_income").style.display = "none";
      document.getElementById("_adduser").style.display = "none";
      document.getElementById("_addproduct").style.display = "none";
      document.getElementById("_addcategory").style.display = "none";
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.selectuser_list = {};
      this.pro_list = {};
      this.categorylist = {};
      this.order_list = {};
      this.$axios
        .get(url + "/user/list", {
          params: {
            pageSize: 10
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 200) {
            this.userlist = response.data.data.list;
            this.userpagepager = response.data.data.pageNum;
            this.userpageSize = response.data.data.pageSize;
            this.userpageTotal = response.data.data.total;
          } else {
            this.$alert(response.data.message, "消息", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {});
    },
    userpager(val) {
      this.usernext(val);
    },
    userprev(val) {
      this.usernext(val);
    },
    usernext(val) {
      if (this.userlist.length > 0) {
        this.selectuser_list = {};
        this.pro_list = {};
        this.categorylist = {};
        this.order_list = {};
        this.$axios
          .get(url + "/user/list", {
            params: {
              pageNum: val,
              pageSize: 10
            }
          })
          .then(response => {
            if (response.data.status == 200) {
              this.userlist = response.data.data.list;
              this.userpagepager = response.data.data.pageNum;
              this.userpageSize = response.data.data.pageSize;
              this.userpageTotal = response.data.data.total;
            } else {
              this.$alert(response.data.message, "消息", {
                confirmButtonText: "确定"
              });
            }
          })
          .catch(error => {});
      } else {
        this.pro_list = {};
        this.categorylist = {};
        this.order_list = {};
        this.userlist = {};
        this.$axios
          .get(url + "/user/list", {
            params: {
              telphone: this.usermess,
              pageNum: val,
              pageSize: 10
            }
          })
          .then(res => {
            if (res.data.status == 200) {
              if (res.data.data.list.length == 0) {
                this.$axios
                  .get(url + "/user/list", {
                    params: {
                      shopName: this.usermess,
                      pageNum: val,
                      pageSize: 10
                    }
                  })
                  .then(r => {
                    this.userlist = {};
                    this.selectuser_list = r.data.data.list;
                    this.userpagepager = r.data.data.pageNum;
                    this.userpageSize = r.data.data.pageSize;
                    this.userpageTotal = r.data.data.total;
                  })
                  .catch(r => {});
              } else {
                this.userlist = {};
                this.selectuser_list = res.data.data.list;
                this.userpagepager = res.data.data.pageNum;
                this.userpageSize = res.data.data.pageSize;
                this.userpageTotal = res.data.data.total;
              }
            } else {
            }
          })
          .catch(error => {});
      }
    },
    userbtn(userId) {
      this.$confirm("是否删除用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$axios
            .get(url + "/user/del", {
              params: {
                uid: userId
              }
            })
            .then(response => {
              if (response.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.usernext(this.userpagepager);
              } else {
                this.$alert("查询失败！", "消息", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(error => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    userupbtn(option) {
      this.$axios
        .get(url + "/user/findById", {
          params: {
            uid: option
          }
        })
        .then(response => {
          if (response.data.status == 200) {
            this.user_up = response.data.data;
          } else {
          }
        })
        .catch(error => {});
      document.getElementById("light").style.display = "block";
      document.getElementById("fade").style.display = "block";
    },
    user_update(userId) {
      let userUserName = this.user_up.userUserName;
      let userPassword = this.user_up.userPassword;
      let userTelphone = this.user_up.userTelphone;
      let userAddress = this.user_up.userAddress;
      let userShopName = this.user_up.userShopName;
      let userComment = this.user_up.userComment;
      let userStatus = this.user_up.userStatus;

      let params = this.$qs.stringify({
        userId: userId,
        userUserName: userUserName,
        userPassword: userPassword,
        userTelphone: userTelphone,
        userAddress: userAddress,
        userShopName: userShopName,
        userComment: userComment,
        userStatus: userStatus
      });

      let that = this;
      this.$confirm("是否修改用户资料？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        that.$axios
          .post(url + "/user/update", params)
          .then(res => {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.usernext(this.userpagepager)
              document.getElementById("light").style.display = "none";
              document.getElementById("fade").style.display = "none";
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "修改异常!"
            });
          });
      });
    },
    user_close() {
      document.getElementById("light").style.display = "none";
      document.getElementById("fade").style.display = "none";
      this.$message({
        type: "info",
        message: "已取消修改!"
      });
    },

    pro_close() {
      this.$message({
        type: "info",
        message: "已取消修改!"
      });
      document.getElementById("light").style.display = "none";
      document.getElementById("fade").style.display = "none";
    },

    pro_update() {
      this.categorylist = {};
      this.order_list = {};
      this.userlist = {};
      this.$confirm("是否修改商品信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = this.$qs.stringify({
            productId: this.pro_up.productId,
            productCode: this.pro_up.productCode,
            productName: this.pro_up.productName,
            productStandard: this.pro_up.productStandard,
            productSmallUnit: this.pro_up.productSmallUnit,
            productSmallPrice: this.pro_up.productSmallPrice,
            productLargerUnit: this.pro_up.productLargerUnit,
            productLargerPrice: this.pro_up.productLargerPrice,
            productCategoryId: this.pro_up.productCategoryId,
            productBrandId: this.pro_up.productBrandId,
            productPhoto: this.pro_up.productPhoto,
            productIsSale: this.pro_up.productIsSale,
            productIsLack: this.pro_up.productIsLack,
            productStatus: this.pro_up.productStatus,
            productOrder: this.pro_up.productOrder,
            productLargerStandard: this.pro_up.productLargerStandard,
            productSuggestPrice: this.pro_up.productSuggestPrice
          });
          this.$axios
          //修改商品
            .post(url + "/api/product/update", params)
            .then(response => {
              console.log(response);
              if (response.data.status == 200) {
                this.$message({
                  type: "seccess",
                  message: "修改商品成功!"
                });
                this.pronext(this.pro_pagepager);
              }
            })
            .catch(response => {
              console.log(response);
              this.$message({
                type: "error",
                message: "修改异常!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改!"
          });
        });
    },

    product() {
      document.getElementById("other_sell").style.display = "none";
      document.getElementById("other_income").style.display = "none";
      document.getElementById("_adduser").style.display = "none";
      document.getElementById("_addproduct").style.display = "none";
      document.getElementById("_addcategory").style.display = "none";
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.selectuser_list = {};
      this.selectpro_list = {};
      this.categorylist = {};
      this.order_list = {};
      this.userlist = {};
      this.$axios
        .get(url + "/api/product/all", {
          params: {
            pageNum: 1,
            pageSize: 8,
            categoryId: "",
            productName: "",
            isLack: ""
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            for (let i of res.data.data.list) {
              if (i.productIsLack == 1) {
                i.productIsLack = false;
              } else {
                i.productIsLack = true;
              }
            }
            this.pro_list = res.data.data.list;
            this.pro_pagepager = res.data.data.pageNum;
            this.pro_pageSize = res.data.data.pageSize;
            this.pro_pageTotal = res.data.data.total;
          }
        })
        .catch(res => {});
    },
    pro_isLack(id, value) {
      console.log(id);
      console.log(value);
      if (value == true) {
        this.$axios
          .get(url + "/api/wuhuo/find", {
            params: {
              id: id
            }
          })
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "设置失败!"
              });
            }
          })
          .catch(res => {
            this.$message({
              type: "error",
              message: "设置异常!"
            });
          });
      } else if (value == false) {
        this.$axios
          .get(url + "/api/youhuo/fod", {
            params: {
              id: id
            }
          })
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "设置失败!"
              });
            }
          })
          .catch(res => {
            this.$message({
              type: "error",
              message: "设置异常!"
            });
          });
      }
    },
    proprev(val) {
      this.pronext(val);
    },
    propager(val) {
      this.pronext(val);
    },
    pronext(val) {
      if (this.pro_list.length > 0) {
        this.categorylist = {};
        this.order_list = {};
        this.userlist = {};
        //查询所有商品并分页
        this.$axios
          .get(url + "/api/product/all", {
            params: {
              pageNum: val,
              pageSize: 8,
              categoryId: "",
              productName: "",
              isLack: ""
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.status == 200) {
              for (let i of res.data.data.list) {
                if (i.productIsLack == 1) {
                  i.productIsLack = false;
                } else {
                  i.productIsLack = true;
                }
              }
              this.pro_list = res.data.data.list;
              this.pro_pagepager = res.data.data.pageNum;
              this.pro_pageSize = res.data.data.pageSize;
              this.pro_pageTotal = res.data.data.total;
              document.getElementById("light").style.display = "none";
              document.getElementById("fade").style.display = "none";
            }
          })
          .catch(res => {});
      } else {
        this.categorylist = {};
        this.order_list = {};
        this.userlist = {};

        this.$axios
          .get(url + "/api/product/all", {
            params: {
              pageNum: val,
              pageSize: 8,
              categoryId: this.promess,
              productName: "",
              isLack: ""
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.data.list.length == 0) {
              this.$axios
                .get(url + "/api/product/all", {
                  params: {
                    pageNum: val,
                    pageSize: 8,
                    categoryId: "",
                    productName: this.promess,
                    isLack: ""
                  }
                })
                .then(r => {
                  if (r.data.data.list.length == 0) {
                    this.$message({
                      type: "seccess",
                      message: "暂无数据!"
                    });
                  } else {
                    this.pro_list = {};
                    this.selectpro_list = r.data.data.list;
                    this.pro_pagepager = r.data.data.pageNum;
                    this.pro_pageSize = r.data.data.pageSize;
                    this.pro_pageTotal = r.data.data.total;
                    document.getElementById("light").style.display = "none";
                    document.getElementById("fade").style.display = "none";
                  }
                })
                .catch(error => {
                  this.$message({
                    type: "error",
                    message: "查询异常!"
                  });
                });
            } else {
              this.pro_list = {};
              this.selectpro_list = res.data.data.list;
              this.pro_pagepager = res.data.data.pageNum;
              this.pro_pageSize = res.data.data.pageSize;
              this.pro_pageTotal = res.data.data.total;
            }
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "查询异常!"
            });
          });
      }
    },
    pro_btn(id) {
      this.$confirm("是否废弃商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$axios
            .get(url + "/product/drop", {
              params: {
                productId: id
              }
            })
            .then(res => {
              if (res.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "废弃成功!"
                });
                this.pronext(this.pro_pagepager);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message + "!"
                });
              }
            })
            .catch(res => {
              this.$message({
                type: "error",
                message: "废弃异常!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "取消废弃!"
          });
        });
    },
    pro_upbtn(id) {
      this.categorylist = {};
      this.order_list = {};
      this.userlist = {};
      //查询类别列表
      this.$axios
        .get(url + "/api/category/list")
        .then(response => {
          console.log(response);
          if (response.data.status == 200) {
            this.addpro_catelist = response.data.data;
          } else {
            this.$alert(response.data.message, "消息", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {});

      this.$axios
        .get(url + "/api/product/find/id", {
          params: {
            productId: id
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.data == null) {
            this.$message({
              type: "error",
              message: "暂无数据!"
            });
          } else {
            this.pro_up = response.data.data;
            document.getElementById("light").style.display = "block";
            document.getElementById("fade").style.display = "block";
          }
        })
        .catch(error => {});
    },

    selectbtn_pro(mess) {
      this.$axios
        .get(url + "/api/product/find/id", {
          params: {
            productId: mess
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.data == null) {
            this.$axios
              .get(url + "/api/product/all", {
                params: {
                  pageNum: 1,
                  pageSize: 8,
                  categoryId: mess,
                  productName: "",
                  isLack: ""
                }
              })
              .then(res => {
                console.log(res);
                if (res.data.data.list.length == 0) {
                  this.$axios
                    .get(url + "/api/product/all", {
                      params: {
                        pageNum: 1,
                        pageSize: 8,
                        categoryId: "",
                        productName: mess,
                        isLack: ""
                      }
                    })
                    .then(r => {
                      if (r.data.data.list.length == 0) {
                        this.$message({
                          type: "seccess",
                          message: "暂无数据!"
                        });
                      } else {
                        this.$message({
                          type: "seccess",
                          message: "查询成功!"
                        });
                        this.pro_list = {};
                        this.selectpro_list = r.data.data.list;
                        this.pro_pagepager = r.data.data.pageNum;
                        this.pro_pageSize = r.data.data.pageSize;
                        this.pro_pageTotal = r.data.data.total;
                      }
                    })
                    .catch(error => {
                      this.$message({
                        type: "error",
                        message: "查询异常!"
                      });
                    });
                } else {
                  this.pro_list = {};
                  this.selectpro_list = res.data.data.list;
                  this.pro_pagepager = res.data.data.pageNum;
                  this.pro_pageSize = res.data.data.pageSize;
                  this.pro_pageTotal = res.data.data.total;
                }
              })
              .catch(error => {
                this.$message({
                  type: "error",
                  message: "查询异常!"
                });
              });
          } else {
            this.pro_up = response.data.data;
            document.getElementById("light").style.display = "block";
            document.getElementById("fade").style.display = "block";
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "查询异常!"
          });
        });
    },

    select_categroy() {
      this.categroy_id;
      this.categoryupbtn(this.categroy_id);
    },
    category() {
      document.getElementById("other_sell").style.display = "none";
      document.getElementById("other_income").style.display = "none";
      document.getElementById("_adduser").style.display = "none";
      document.getElementById("_addproduct").style.display = "none";
      document.getElementById("_addcategory").style.display = "none";

      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.pro_list = {};
      this.order_list = {};
      this.userlist = {};
      this.selectuser_list = {};
      this.selectpro_list = {};
      this.$axios
        .get(url + "/api/category/list")
        .then(response => {
          if (response.data.status == 200) {
            this.categorylist = response.data.data;
          } else {
            this.$alert(response.data.message, "消息", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {});
    },
    categorybtn(categoryId) {
      let that = this;
      this.$confirm("是否删除类别？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          that.$axios
            .get(url + "/api/category/delById", {
              params: {
                categoryId: categoryId
              }
            })
            .then(response => {
              if (response.data.status == 200) {
                this.$axios
                  .get(url + "/api/category/list")
                  .then(response => {
                    if (response.data.status == 200) {
                      this.categorylist = response.data.data;
                    } else {
                      this.$alert(response.data.message, "消息", {
                        confirmButtonText: "确定"
                      });
                    }
                  })
                  .catch(error => {});
              } else {
                this.$alert(response.data.message, "消息", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(error => {});
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    categoryupbtn(option) {
      this.$axios
        .get(url + "/api/category/selectById", {
          params: {
            categoryId: option
          }
        })
        .then(response => {
          if (response.data.data == null) {
            this.$alert("查询失败，请检查类别编号！", "消息", {
              confirmButtonText: "确定"
            });
          } else {
            this.categroy_up = response.data.data;
            document.getElementById("light").style.display = "block";
            document.getElementById("fade").style.display = "block";
          }
        })
        .catch(error => {});
    },

    categroy_update(categoryId) {
      let categoryName = this.categroy_up.categoryName;
      let categoryOrder = this.categroy_up.categoryOrder;
      let categoryStatus = this.categroy_up.categoryStatus;

      let params = this.$qs.stringify({
        categoryId: categoryId,
        categoryName: categoryName,
        categoryOrder: categoryOrder,
        categoryStatus: categoryStatus
      });

      let that = this;
      this.$confirm("是否修改类别？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        that.$axios
          .post(url + "/api/category/update", params)
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$axios
                .get(url + "/api/category/list")
                .then(response => {
                  if (response.data.status == 200) {
                    this.categorylist = response.data.data;
                  } else {
                    this.$alert(response.data.message, "消息", {
                      confirmButtonText: "确定"
                    });
                  }
                })
                .catch(error => {});
              document.getElementById("light").style.display = "none";
              document.getElementById("fade").style.display = "none";
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "修改异常!"
            });
          });
      });
    },
    categroy_close() {
      document.getElementById("light").style.display = "none";
      document.getElementById("fade").style.display = "none";
      this.$message({
        type: "info",
        message: "已取消修改!"
      });
    },
    categoryOrder_Change(id, name, value) {
      console.log(value);
      let params = this.$qs.stringify({
        categoryId: id,
        categoryName: name,
        categoryOrder: value
      });

      this.$axios
        .post(url + "/api/category/update", params)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.message + "！"
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "修改异常!"
          });
        });
    },
    income() {
      this.$prompt("请输入年份", "年度营业收入", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let params = this.$qs.stringify({
            year: value
          });
          this.$axios
            .post(url + "/order/selectTop", params)
            .then(res => {
              if (res.data.status == 200) {
                this.loading = true;
                setTimeout(() => {
                  this.userlist = {};
                  this.order_list = {};
                  this.pro_list = {};
                  this.categorylist = {};
                  this.selectuser_list = {};
                  this.selectpro_list ={};
                  document.getElementById("other_sell").style.display = "none";
                  document.getElementById("_adduser").style.display = "none";
                  document.getElementById("_addproduct").style.display = "none";
                  document.getElementById("_addcategory").style.display =
                    "none";

                  this.loading = false;
                  this.selectTop = res.data.data;
                  document.getElementById("other_income").style.display =
                    "block";
                }, 500);

                let xdata = [];
                let sdata = [];
                let sum = 0;
                for (let j of res.data.data) {
                  sum = sum + j.SUMER;
                }
                for (let i of res.data.data) {
                  xdata.push(i.MONTHS);
                  sdata.push((i.SUMER / sum) * 100);
                }
                let myChart = this.$echarts.init(
                  document.getElementById("echarts1")
                );
                // 绘制图表
                myChart.setOption({
                  color: ["#3398DB"],
                  title: {
                    text: value + "年度各季度营业收入",
                    x: "center"
                  },
                  tooltip: {
                    trigger: "item",
                    formatter: "{c}%" //这是关键，在需要的地方加上就行了
                  },
                  grid: {
                    borderWidth: 0,
                    y: 80,
                    y2: 60
                  },
                  xAxis: [
                    {
                      type: "category",
                      show: true,
                      data: xdata
                    }
                  ],
                  yAxis: [
                    {
                      type: "value",
                      show: true
                    }
                  ],
                  series: [
                    {
                      name: "营业收入",
                      type: "bar",
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: "top",
                            formatter: "{b}\n{c}%" //这是关键，在需要的地方加上就行了
                          }
                        }
                      },
                      data: sdata
                    }
                  ]
                });
                console.log(res);
              } else {
                this.$message({
                  type: "info",
                  message: "输入有误请重新输入！"
                });
              }
            })
            .catch(res => {
              this.$message({
                type: "info",
                message: "查询异常！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消查询"
          });
        });
    },
    sell() {
      this.$prompt("请输入年份", "年度商品销售排行", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let params = this.$qs.stringify({
            year: value
          });
          this.$axios
            .post(url + "/api/year/fod", params)
            .then(res => {
              if (res.data.status == 200) {
                this.loading = true;
                setTimeout(() => {
                  this.userlist = {};
                  this.order_list = {};
                  this.pro_list = {};
                  this.categorylist = {};
                  this.selectuser_list = {};
                  this.selectpro_list ={};
                  document.getElementById("other_sell").style.display = "none";
                  document.getElementById("other_income").style.display =
                    "none";
                  document.getElementById("_adduser").style.display = "none";
                  document.getElementById("_addproduct").style.display = "none";
                  document.getElementById("_addcategory").style.display =
                    "none";
                  this.loading = false;
                  this.topPrice = res.data.data;
                  document.getElementById("other_sell").style.display = "block";
                }, 500);

                let xdata = [];
                let sdata = [];
                let sum = 0;
                for (let j of res.data.data) {
                  sum = sum + j.SUMER;
                }
                for (let i of res.data.data) {
                  let js = {
                    value: (i.SUMER / sum) * 100,
                    name: i.PRODUCT_NAME
                  };
                  xdata.push(i.PRODUCT_NAME);
                  sdata.push(js);
                }
                let myChart = this.$echarts.init(
                  document.getElementById("echarts2")
                );
                // 绘制图表
                myChart.setOption({
                  title: {
                    text: value + "年度商品销售排行",
                    x: "center"
                  },

                  tooltip: {
                    trigger: "item",
                    formatter: "{c}%"
                  },
                  legend: {
                    orient: "vertical",
                    left: "left",
                    data: xdata
                  },
                  series: [
                    {
                      name: "销售收入",
                      type: "pie",
                      radius: "55%",
                      center: ["50%", "60%"],
                      data: sdata,
                      itemStyle: {
                        normal: {
                          label: {
                            show: true,
                            position: "top",
                            formatter: "{b}\n{c}%" //这是关键，在需要的地方加上就行了
                          }
                        },
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                      }
                    }
                  ]
                });

                console.log(res);
              } else {
                this.$message({
                  type: "info",
                  message: "输入有误请重新输入！"
                });
              }
            })
            .catch(res => {
              this.$message({
                type: "info",
                message: "查询异常！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消查询"
          });
        });
    }
  }
};
</script>
<style>
.admin {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.black_overlay_category {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 1920px;
  height: 1080px;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=88);
}
.white_content_category {
  display: none;
  position: absolute;
  top: 230px;
  left: 25%;
  width: 50%;
  height: 400px;
  padding: 20px;
  border: 10px solid white;
  background-color: white;
  z-index: 1002;
  overflow: auto;
  font-size: 25px;
}
.black_overlay_user {
  display: none;
  z-index: 1001;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 1920px;
  height: 1080px;
  background-color: black;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=88);
}
.white_content_user {
  display: none;
  z-index: 1002;
  position: absolute;
  top: 150px;
  left: 25%;
  width: 50%;
  height: 600px;
  padding: 20px;
  border: 5px solid white;
  background-color: white;
  overflow: auto;
  font-size: 25px;
}
.black_overlay_pro {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 1920px;
  height: 1080px;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=88);
}
.white_content_pro {
  display: none;
  position: absolute;
  top: 50px;
  left: 23%;
  width: 50%;
  height: 600px;
  padding: 20px;
  border: 10px solid white;
  background-color: white;
  z-index: 1002;
  overflow: auto;
  font-size: 25px;
}
.black_overlay_order {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 1920px;
  height: 1080px;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=88);
}
.white_content_order {
  display: none;
  position: absolute;
  top: 150px;
  left: 20%;
  width: 60%;
  height: 600px;
  padding: 20px;
  border: 10px solid white;
  background-color: white;
  z-index: 1002;
  overflow: auto;
  font-size: 25px;
}
.pro_p {
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.pro_p input {
  width: 300px;
  height: 30px;
  font-size: 20px;
}
.categroy_p {
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.categroy_p input {
  width: 300px;
  height: 30px;
  font-size: 20px;
}
.user_p {
  font-size: 20px;
  justify-content: flex-start;
  margin-left: 0;
  padding-left: 0;
  margin-top: 15px;
  margin-bottom: 15px;
}
.user_p input {
  width: 300px;
  height: 30px;
  font-size: 20px;
}
.white_content_category el-button {
  margin-top: 20px;
}
.white_content_user el-button {
  margin-top: 20px;
}
.white_content_pro el-button {
  margin-top: 20px;
}
#_adduser {
  display: none;
  margin: auto;
}
#_addcategory {
  display: none;
  margin: auto;
}
.add_user_div {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 550px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.add_user_div_input {
  margin-right: 0px;
}
.add_user_div_button {
  margin: auto;
  width: 100%;
}
.add_product {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0;
  display: none;
}
.add_product_div {
  display: flex;
  flex-direction: column;
}
.add_product_div {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#other_income {
  display: none;
}
#other_sell {
  display: none;
}
</style>
