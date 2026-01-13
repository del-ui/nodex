from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Issue

@receiver(post_save, sender=Issue)
def issue_notifications(sender, instance, created, **kwargs):
    """
    Send notifications when an issue is created, assigned, or resolved
    """
    if created:
        # Notify admin that a new issue has been reported
        send_mail(
            subject=f"New Issue Reported: {instance.title}",
            message=f"Issue '{instance.title}' was reported by {instance.created_by}.",
            from_email="no-reply@nodex.com",
            recipient_list=[admin.email for admin in instance.created_by.__class__.objects.filter(is_staff=True)]
        )
    else:
        if instance.status == "assigned":
            # Notify technician
            if instance.assigned_to:
                send_mail(
                    subject=f"Issue Assigned: {instance.title}",
                    message=f"You have been assigned the issue '{instance.title}'.",
                    from_email="no-reply@nodex.com",
                    recipient_list=[instance.assigned_to.email]
                )
        elif instance.status == "resolved":
            # Notify reporter that issue is resolved
            send_mail(
                subject=f"Issue Resolved: {instance.title}",
                message=f"Your issue '{instance.title}' has been resolved by {instance.assigned_to}.",
                from_email="no-reply@nodex.com",
                recipient_list=[instance.created_by.email]
            )
