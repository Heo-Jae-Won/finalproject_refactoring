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


 
	<bean id="mapper" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
	<property name="basePackage" value="com.example.mapper" />
	<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
	</bean>



export default PboardPage