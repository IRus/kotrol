package io.heapy.kotrol

import io.heapy.kotrol.css.CSS
import io.heapy.kotrol.model.Projects
import kotlinx.html.a
import kotlinx.html.body
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.head
import kotlinx.html.html
import kotlinx.html.img
import kotlinx.html.lang
import kotlinx.html.meta
import kotlinx.html.span
import kotlinx.html.stream.createHTML
import kotlinx.html.style
import kotlinx.html.title
import kotlinx.html.unsafe

fun generateHtml(projects: Projects): String {
    return "<!DOCTYPE html>\n" + createHTML().html {
        lang = "en"
        head {
            meta { charset = "utf-8" }
            meta {
                name = "viewport"
                content = "width=device-width, initial-scale=1"
            }
            title { +"Kotrol — Home Projects" }
            style {
                unsafe {
                    raw(CSS)
                }
            }
        }
        body {
            div("container") {
                h1 { +"Kotrol" }
                div("grid") {
                    for (project in projects.projects) {
                        a(href = project.link, classes = "card") {
                            target = "_blank"
                            rel = "noopener noreferrer"
                            img(alt = project.title, src = "logos/${project.logo}", classes = "logo")
                            span("title") { +project.title }
                        }
                    }
                }
            }
        }
    }
}
