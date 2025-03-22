package com.finance.SugerMarket.agent.service;

import java.util.Date;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.SugerMarket.agent.jobs.UpdateBudgetAgent;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Service
public class SchedulerService {
	private static final Logger log = LoggerFactory.getLogger(SchedulerService.class);

	@Autowired
	private Scheduler scheduler;

	@PostConstruct
	public void init() {
		try {
			scheduler.start();
			JobDetail jobDetails = buildJobDetail(UpdateBudgetAgent.class);
			Trigger trigger = buildTrigger(UpdateBudgetAgent.class, "00 00 00 ? * * *"); //run every day at 12
			
			scheduler.scheduleJob(jobDetails, trigger);
		} catch (Exception e) {
			log.error("error while starting scheduler: ", e);
		}
	}

//	public List<String> getAllAgents() {
//		List<String> agents = new ArrayList<>(AgentConstants.AgentMap.keySet());
//		return agents;
//	}
//
//	public void triggerAgentByClass(String AgentName) throws Exception {
//		log.info("Triggering " + AgentName);
//		// scheduler.start();
//		JobDetail jobDetails = buildJobDetail(AgentConstants.AgentMap.get(AgentName));
//		Trigger trigger = buildTrigger(AgentConstants.AgentMap.get(AgentName));
//
//		scheduler.scheduleJob(jobDetails, trigger);
//	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private JobDetail buildJobDetail(Class jobClass) {
		JobDataMap jobDataMap = new JobDataMap();
		jobDataMap.put("date", new Date());
//        jobDataMap.put(jobClass.getSimpleName(), info);

		return JobBuilder.newJob(jobClass).withIdentity(jobClass.getSimpleName()).setJobData(jobDataMap).build();
	}

	@SuppressWarnings("rawtypes")
	private Trigger buildTrigger(Class jobClass, String cronExpression) {
		return TriggerBuilder.newTrigger().withIdentity(jobClass.getSimpleName())
				.withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
				.startAt(new Date(System.currentTimeMillis())).build();
	}

//	private Trigger buildTrigger(Class jobClass) {
//		return TriggerBuilder.newTrigger().withIdentity(jobClass.getSimpleName()).startNow().build();
//	}

	@PreDestroy
	public void preDestroy() {
		try {
			scheduler.shutdown();
		} catch (Exception e) {
			log.error("error while stopping scheduler: ", e);
		}
	}
}