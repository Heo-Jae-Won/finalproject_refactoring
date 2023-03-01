import React from 'react'
import { Route } from 'reactrouterdom'
import pboardInsert from './PboardInsert'
import pboardList from './PboardList'
import pboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
        <Route path="/pboard/list" component={pboardList}/>
        <Route path="/pboard/read/:pcode" component={pboardRead}/>
        <Route path="/pboard/insert/:unickname" component={pboardInsert}/>
    </div>
  )
}


 
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	    <property name="dataSource" ref="dataSource" />
	    <property name="mapperLocations" value="classpath:/mapper/**/*.xml" />
	  </bean>



export default PboardPage