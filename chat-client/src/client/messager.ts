/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    AuthFollowUpClickedParams,
    ErrorParams,
    InsertToCursorPositionParams,
    SendToPromptParams,
    TabIdReceivedParams,
} from '@aws/chat-client-ui-types'
import {
    ChatParams,
    FeedbackParams,
    FollowUpClickParams,
    InfoLinkClickParams,
    LinkClickParams,
    SourceLinkClickParams,
    TabAddParams,
    TabChangeParams,
    TabRemoveParams,
} from '@aws/language-server-runtimes-types'
import { TelemetryParams } from '../contracts/serverContracts'
import { CopyCodeToClipboardParams, VoteParams } from '../contracts/telemetry'

export interface OutboundChatApi {
    sendChatPrompt(params: ChatParams): void
    tabAdded(params: TabAddParams): void
    tabChanged(params: TabChangeParams): void
    tabRemoved(params: TabRemoveParams): void
    tabIdReceived(params: TabIdReceivedParams): void
    telemetry(params: TelemetryParams): void
    insertToCursorPosition(params: InsertToCursorPositionParams): void
    authFollowUpClicked(params: AuthFollowUpClickedParams): void
    followUpClicked(params: FollowUpClickParams): void
    sendFeedback(params: FeedbackParams): void
    linkClick(params: LinkClickParams): void
    sourceLinkClick(params: SourceLinkClickParams): void
    infoLinkClick(params: InfoLinkClickParams): void
    uiReady(): void
}

export class Messager {
    constructor(private readonly chatApi: OutboundChatApi) {}

    onTabAdd = (tabId: string): void => {
        this.chatApi.tabAdded({ tabId })
    }

    onTabChange = (tabId: string): void => {
        this.chatApi.tabChanged({ tabId })
    }

    onTabRemove = (tabId: string): void => {
        this.chatApi.tabRemoved({ tabId })
    }

    onUiReady = (): void => {
        this.chatApi.uiReady()
    }

    onSendToPrompt = (params: SendToPromptParams, tabId: string): void => {
        this.chatApi.tabIdReceived({
            eventId: params.eventId,
            tabId: tabId,
        })
    }

    onChatPrompt = (params: ChatParams): void => {
        this.chatApi.sendChatPrompt(params)
    }

    onInsertToCursorPosition = (params: InsertToCursorPositionParams): void => {
        this.chatApi.insertToCursorPosition(params)
    }

    onAuthFollowUpClicked = (params: AuthFollowUpClickedParams): void => {
        this.chatApi.authFollowUpClicked(params)
        this.chatApi.telemetry(params)
    }

    onFollowUpClicked = (params: FollowUpClickParams): void => {
        this.chatApi.followUpClicked(params)
    }

    onCopyCodeToClipboard = (params: CopyCodeToClipboardParams): void => {
        this.chatApi.telemetry(params)
    }

    onVote = (params: VoteParams): void => {
        this.chatApi.telemetry(params)
    }

    onSendFeedback = (params: FeedbackParams): void => {
        this.chatApi.sendFeedback(params)
    }

    onLinkClick = (params: LinkClickParams): void => {
        this.chatApi.linkClick(params)
    }

    onSourceLinkClick = (params: SourceLinkClickParams): void => {
        this.chatApi.sourceLinkClick(params)
    }

    onInfoLinkClick = (params: InfoLinkClickParams): void => {
        this.chatApi.infoLinkClick(params)
    }

    onError = (params: ErrorParams): void => {
        this.chatApi.tabIdReceived({
            eventId: params.eventId || '',
            tabId: params.tabId,
        })
    }
}
