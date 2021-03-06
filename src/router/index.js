import Vue from 'vue'
import Router from 'vue-router'
import File from '../components/File'
// import EmpAdv from '@/components/emp/EmpAdv'
// import EmpBasic from '@/components/emp/EmpBasic'
// import PerEc from '@/components/personnel/PerEc'
// import PerEmp from '@/components/personnel/PerEmp'
// import PerMv from '@/components/personnel/PerMv'
// import PerSalary from '@/components/personnel/PerSalary'
// import PerTrain from '@/components/personnel/PerTrain'
// import SalMonth from '@/components/salary/SalMonth'
// import SalSearch from '@/components/salary/SalSearch'
// import SalSob from '@/components/salary/SalSob'
// import SalSobCfg from '@/components/salary/SalSobCfg'
// import SalTable from '@/components/salary/SalTable'
// import StaAll from '@/components/statistics/StaAll'
// import StaPers from '@/components/statistics/StaPers'
// import StaRecord from '@/components/statistics/StaRecord'
// import StaScore from '@/components/statistics/StaScore'
// import SysBasic from '@/components/system/SysBasic'
// import SysCfg from '@/components/system/SysCfg'
// import SysData from '@/components/system/SysData'
// import SysHr from '@/components/system/SysHr'
// import SysInit from '@/components/system/SysInit'
// import SysLog from '@/components/system/SysLog'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path:'/emp',
      name:'Employee',
      component:EmpBasic,
      hidden:true,
    },*/
    {
      path: '/',
      name: 'File',
      component: File,
      hidden: true
    }
    // , {
    //   path: '/home',
    //   name: '主页',
    //   component: Home,
    //   hidden: true,
    //   meta: {
    //     requireAuth: true // 添加该字段,表示进入这个路由是需要登录的
    //   },
    //   children:[
    //     // {
    //     //   path: '/emp',
    //     //   component: EmpBasic,
    //     //   name: '员工管理',
    //     //   meta:{title:'员工基本信息'}
    //     // },{
    //     //   path: '/image',
    //     //   component: picture,
    //     //   name: '人脸识别',
    //     //   meta:{title:'图片信息'}
    //     // },
    //     {
    //       path: '/file',
    //       component: File,
    //       name: '文件搜索',
    //       meta:{title:'搜索文件'}
    //     }
    //   ]
    // }
  ]
})
