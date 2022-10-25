from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify

# PREMIUM PLANS DESCRIPTIONS
class PremiumPlansDescriptions(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    body = models.CharField(max_length=500)
    slug = models.SlugField(blank=True, null=True)

    def __str__(self):
        return f'{self.name} || {self.price}'
    
@receiver(pre_save, sender=PremiumPlansDescriptions)
def premium_plans_descrp_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)
        

# PAYMENT MODEL
