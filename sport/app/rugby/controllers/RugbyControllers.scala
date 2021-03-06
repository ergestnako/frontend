
package rugby.controllers

import com.softwaremill.macwire._
import model.ApplicationContext
import rugby.jobs.RugbyStatsJob

trait RugbyControllers {
  def rugbyStatsJob: RugbyStatsJob
  implicit def appContext: ApplicationContext
  lazy val matchesController = wire[MatchesController]
}
