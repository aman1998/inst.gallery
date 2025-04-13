import type { EventEntity } from "@paddle/paddle-node-sdk";
import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventName,
  SubscriptionActivatedEvent,
  SubscriptionCanceledEvent,
  SubscriptionCreatedEvent,
  SubscriptionPastDueEvent,
  SubscriptionPausedEvent,
  SubscriptionResumedEvent,
  SubscriptionTrialingEvent,
  SubscriptionUpdatedEvent,
} from "@paddle/paddle-node-sdk";

import { createClient } from "@shared/config/supabase/server";
import { ESupabaseDB } from "@shared/config/supabase/types";

export class ProcessWebhook {
  async processEvent(eventData: EventEntity): Promise<void> {
    try {
      console.log("event eventType", eventData.eventType);
      // Валидация базовых полей события
      if (!eventData.eventType || !eventData.data) {
        Response.json({ status: 400, error: "Invalid event data" });
        return;
      }

      let result: { success: boolean; error?: string };

      switch (eventData.eventType) {
        case EventName.SubscriptionCreated:
        case EventName.SubscriptionUpdated:
        case EventName.SubscriptionActivated:
        case EventName.SubscriptionTrialing:
          result = await this.handleSubscriptionUpdate(eventData);
          break;

        case EventName.SubscriptionCanceled:
          result = await this.handleSubscriptionCancellation(eventData);
          break;

        case EventName.SubscriptionPaused:
          result = await this.handleSubscriptionPause(eventData);
          break;

        case EventName.SubscriptionResumed:
          result = await this.handleSubscriptionResume(eventData);
          break;

        case EventName.SubscriptionPastDue:
          result = await this.handleSubscriptionPastDue(eventData);
          break;

        case EventName.CustomerCreated:
        case EventName.CustomerUpdated:
          result = await this.handleCustomerUpdate(eventData);
          break;

        default:
          result = {
            success: true,
          };
          break;
        // throw new Error("Unhandled event type");
      }

      if (!result.success) {
        throw new Error(result.error || "Processing failed");
      }

      Response.json({ status: 200, success: true });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Internal server error");
    }
  }

  private async handleSubscriptionUpdate(
    eventData:
      | SubscriptionCreatedEvent
      | SubscriptionUpdatedEvent
      | SubscriptionActivatedEvent
      | SubscriptionTrialingEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();

      const { error } = await supabase.from(ESupabaseDB.subscriptions).upsert({
        subscription_id: eventData.data.id,
        subscription_status: eventData.data.status,
        price_id: eventData.data.items[0]?.price?.id ?? null,
        product_id: eventData.data.items[0]?.price?.productId ?? null,
        scheduled_change: eventData.data.scheduledChange?.effectiveAt ?? null,
        customer_id: eventData.data.customerId,
        canceled_at: null,
        paused_at: null,
        updated_at: new Date().toISOString(),
      });

      return {
        success: !error,
        error: error?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription update failed",
      };
    }
  }

  private async handleSubscriptionCancellation(
    eventData: SubscriptionCanceledEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from(ESupabaseDB.subscriptions)
        .update({
          subscription_status: eventData.data.status,
          canceled_at: eventData.data.scheduledChange?.effectiveAt ?? new Date().toISOString(),
          paused_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq("subscription_id", eventData.data.id);

      return {
        success: !error,
        error: error?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription cancellation failed",
      };
    }
  }

  private async handleSubscriptionPause(
    eventData: SubscriptionPausedEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from(ESupabaseDB.subscriptions)
        .update({
          subscription_status: eventData.data.status,
          paused_at: eventData.data.scheduledChange?.effectiveAt ?? new Date().toISOString(),
          scheduled_change: eventData.data.scheduledChange?.effectiveAt ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("subscription_id", eventData.data.id);

      return {
        success: !error,
        error: error?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription pause failed",
      };
    }
  }

  private async handleSubscriptionResume(
    eventData: SubscriptionResumedEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from(ESupabaseDB.subscriptions)
        .update({
          subscription_status: eventData.data.status,
          canceled_at: null,
          paused_at: null,
          scheduled_change: null,
          updated_at: new Date().toISOString(),
        })
        .eq("subscription_id", eventData.data.id);

      return {
        success: !error,
        error: error?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription resume failed",
      };
    }
  }

  private async handleSubscriptionPastDue(
    eventData: SubscriptionPastDueEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from(ESupabaseDB.subscriptions)
        .update({
          subscription_status: eventData.data.status,
          past_due_notified_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("subscription_id", eventData.data.id);

      return {
        success: !error,
        error: error?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Past due status update failed",
      };
    }
  }

  private async handleCustomerUpdate(
    eventData: CustomerCreatedEvent | CustomerUpdatedEvent
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();

      const { error, data } = await supabase.from(ESupabaseDB.customers).upsert({
        customer_id: eventData.data.id,
        email: eventData.data.email,
      });

      return {
        success: !error,
        error: error?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Customer update failed",
      };
    }
  }
}
