from django.test import TestCase
from main.models import ChessCourse, ChessStudy, ChessStudyLikes, ChessStudyTable
from member.models import User
import json

# Create your tests here.
class ChessCourseTest(TestCase):
    def setUp(self):
        self.courseFree = ChessCourse.objects.create(name='courseFree', body='ipsum', price=0.00)
        self.courseMaster = ChessCourse.objects.create(name='courseM', body='ipsum', price=9.99)
        self.courseIM = ChessCourse.objects.create(name='courseIM', body='ipsum', price=19.99)
        self.courseGM = ChessCourse.objects.create(name='courseGM', body='ipsum', price=34.99)
        self.user = User.objects.create(username='user')

    # CREATING DB -- start
    def test_is_courses_created(self):
        count = ChessCourse.objects.all().count()
        self.assertEqual(count, 4)

    def test_is_slug_created(self):
        slug = self.courseFree.slug
        self.assertIsNotNone(slug)

    def test_premiumPlans_name(self):
        free = self.courseFree.premiumPlan
        M = self.courseMaster.premiumPlan
        IM = self.courseIM.premiumPlan
        GM = self.courseGM.premiumPlan
        self.assertEqual(free, 'free')
        self.assertEqual(M, 'master')
        self.assertEqual(IM, 'international master')
        self.assertEqual(GM, 'grandmaster')
    # CREATING DB -- end

    # SORTING TEST -- start
    def test_order_by_price(self):    
        sort = '-price'  
        url = f'/api/courses/{sort}/filter/search/1'    
        response = self.client.get(url)
        highest_price = json.loads(response.content)['data'][0]['price']
        self.assertEqual(float(highest_price), 34.99)

    def test_order_by_name(self):    
        sort = 'name'    
        url = f'/api/courses/{sort}/filter/search/1'    
        response = self.client.get(url)
        first_name = json.loads(response.content)['data'][0]['name']
        self.assertEqual(first_name, 'courseFree')

    def test_search(self):    
        sort = 'name'  
        search = 'IM'  
        url = f'/api/courses/{sort}/filter/{search}/1'    
        response = self.client.get(url)
        first_name = json.loads(response.content)['data'][0]['name']
        self.assertEqual(first_name, 'courseIM')

    def test_filter_free(self):    
        sort = 'name'  
        filter_list = 'filter;free;'
        url = f'/api/courses/{sort}/{filter_list}/search/1'    
        response = self.client.get(url)
        count = json.loads(response.content)['data']       
        self.assertEqual(len(count), 1)
    
    def test_filter_free(self):    
        sort = 'name'  
        filter_list = 'filter;free;grandmaster'
        url = f'/api/courses/{sort}/{filter_list}/search/1'    
        response = self.client.get(url)
        count = json.loads(response.content)['data']       
        self.assertEqual(len(count), 2) 
    # SORTING TEST -- end

    # LIKE COURSE -- start
    def test_like_course(self):
        url = f'/api/courses/{self.user.username}/{self.courseFree.id}'    
        response = self.client.post(url)
        course = ChessCourse.objects.filter(liked_by=self.user)[0].name
        self.assertEqual(course, self.courseFree.name)
        self.assertEqual(response.status_code, 200)

    def test_like_multiple_course(self):
        url1 = f'/api/courses/{self.user.username}/{self.courseFree.id}'    
        url2 = f'/api/courses/{self.user.username}/{self.courseMaster.id}'    
        url3 = f'/api/courses/{self.user.username}/{self.courseGM.id}'    
        response = self.client.post(url1)
        response = self.client.post(url2)
        response = self.client.post(url3)
        course = ChessCourse.objects.filter(liked_by=self.user).count()
        self.assertEqual(course, 3)
        self.assertEqual(response.status_code, 200)

        # SORTING TEST -- start
    def test_order_by_price_like(self):
        url1 = f'/api/courses/{self.user.username}/{self.courseFree.id}' 
        url2 = f'/api/courses/{self.user.username}/{self.courseMaster.id}'    
        response = self.client.post(url1)
        response = self.client.post(url2)    
        sort = '-price'  
        url = f'/api/courses/{self.user.username}/{sort}/filter/search/1'    
        response = self.client.get(url)
        highest_price = json.loads(response.content)['data'][0]['price']
        self.assertEqual(float(highest_price), 9.99)

    def test_order_by_name_like(self):   
        url1 = f'/api/courses/{self.user.username}/{self.courseFree.id}' 
        url2 = f'/api/courses/{self.user.username}/{self.courseMaster.id}'    
        response = self.client.post(url1)
        response = self.client.post(url2)   
        sort = 'name'    
        url = f'/api/courses/{self.user.username}/{sort}/filter/search/1'    
        response = self.client.get(url)
        first_name = json.loads(response.content)['data'][0]['name']
        self.assertEqual(first_name, 'courseFree')

    def test_search_like(self):  
        url1 = f'/api/courses/{self.user.username}/{self.courseFree.id}' 
        url2 = f'/api/courses/{self.user.username}/{self.courseMaster.id}'    
        response = self.client.post(url1)
        response = self.client.post(url2)    
        sort = 'name'  
        search = 'M'  
        url = f'/api/courses/{self.user.username}/{sort}/filter/{search}/1'    
        response = self.client.get(url)
        first_name = json.loads(response.content)['data'][0]['name']
        self.assertEqual(first_name, self.courseMaster.name)

    def test_filter_free_like(self): 
        url1 = f'/api/courses/{self.user.username}/{self.courseFree.id}' 
        url2 = f'/api/courses/{self.user.username}/{self.courseMaster.id}'    
        response = self.client.post(url1)
        response = self.client.post(url2)     
        sort = 'name'  
        filter_list = 'filter;free;'
        url = f'/api/courses/{self.user.username}/{sort}/{filter_list}/search/1'    
        response = self.client.get(url)
        count = json.loads(response.content)['data']       
        self.assertEqual(len(count), 1)
    
    def test_filter_free_like(self):   
        url1 = f'/api/courses/{self.user.username}/{self.courseFree.id}' 
        url2 = f'/api/courses/{self.user.username}/{self.courseMaster.id}'    
        response = self.client.post(url1)
        response = self.client.post(url2)   
        sort = 'name'  
        filter_list = 'filter;free;grandmaster'
        url = f'/api/courses/{self.user.username}/{sort}/{filter_list}/search/1'    
        response = self.client.get(url)
        count = json.loads(response.content)['data']       
        self.assertEqual(len(count), 1) 
        # SORTING TEST -- end
    # LIKE COURSE -- end

class ChessStudyTest(TestCase):
    def setUp(self):
        self.user_1 = User.objects.create(username='user_1')
        self.user_2 = User.objects.create(username='user_2')
        self.study_user_1_private = ChessStudy.objects.create(name='study1-west', private=True, author=self.user_1)
        self.study_user_2_private = ChessStudy.objects.create(name='study2-north', private=True, author=self.user_2)
        self.study_user_1_public = ChessStudy.objects.create(name='study3-south', private=False, author=self.user_1)
        self.study_user_2_public = ChessStudy.objects.create(name='study4-east', private=False, author=self.user_2)

        self.study_table_1 = ChessStudyTable.objects.create(study=self.study_user_1_public, coord='a1:wR', text='ipsum lore')
        self.study_table_2 = ChessStudyTable.objects.create(study=self.study_user_1_public, coord='a2:wR', text='ipsum lore')

    def test_is_slug_created(self):
        self.assertEqual(self.study_user_1_private.slug, 'study1-west')

    # EDIT STUDY -- start
    def test_edit_body(self):
        url = f'/api/study/detail/{self.user_1.username}/{self.study_user_1_private.id}'
        data = {'body': 'some text'}
        response = self.client.put(url, data, content_type='application/json')
        self.assertEqual(ChessStudy.objects.get(id=1).body, 'some text')
        self.assertEqual(response.status_code, 200) 

    def test_create_study_too_quickly(self):
        url1 = f'/api/study/{self.user_1.username}/create'
        url2 = f'/api/study/{self.user_1.username}/create'
        response1 = self.client.post(url1)
        response2 = self.client.post(url2)
        msg1 = json.loads(response1.content)['msg']
        msg2 = json.loads(response2.content)['msg']
        self.assertEqual(msg1, "Please wait before adding a new study.")
        self.assertEqual(msg2, "Please wait before adding a new study.")
    # EDIT STUDY -- end

    # DISPLAY STUDIES -- start
    def test_display_studies(self):
        privacy = 'public'
        private = 'false'
        liked = 'false'
        search = 'search'
        sort = 'name'
        url = f'/api/study/{self.user_1.username}/{privacy}/{private}/{liked}/{search}/{sort}/1'
        response = self.client.get(url)
        count = json.loads(response.content)['data']
        self.assertEqual(len(count), 2)

        private = 'true'
        url = f'/api/study/{self.user_1.username}/{privacy}/{private}/{liked}/{search}/{sort}/1'
        response = self.client.get(url)
        count = json.loads(response.content)['data']
        self.assertEqual(len(count), 1)

        private = 'false'
        search = 'east'
        url = f'/api/study/{self.user_1.username}/{privacy}/{private}/{liked}/{search}/{sort}/1'
        response = self.client.get(url)
        count = json.loads(response.content)['data']
        self.assertEqual(len(count), 1)

        ChessStudyLikes.objects.create(user=self.user_1, study=self.study_user_2_public)
        liked = 'true'
        search = 'search'
        url = f'/api/study/{self.user_1.username}/{privacy}/{private}/{liked}/{search}/{sort}/1'
        response = self.client.get(url)
        count = json.loads(response.content)['data']
        self.assertEqual(len(count), 1)

        privacy = 'private'
        liked = 'false'
        url = f'/api/study/{self.user_1.username}/{privacy}/{private}/{liked}/{search}/{sort}/1'
        response = self.client.get(url)
        count = json.loads(response.content)['data']
        self.assertEqual(len(count), 1)

    def test_change_privacy(self):
        url = f'/api/study/detail/{self.user_1.username}/{self.study_user_1_private.id}/table/change-privacy'
        data = {'method': 'PRIVACY', 'current_privacy': 'true'}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        privacy = 'public'
        private = 'false'
        liked = 'false'
        search = 'search'
        sort = 'name'
        url = f'/api/study/{self.user_2.username}/{privacy}/{private}/{liked}/{search}/{sort}/1'
        response = self.client.get(url)
        self.assertEqual(len(json.loads(response.content)['data']), 3)
    # DISPLAY STUDIES -- end

    # MANAGE CHESS STUDY TABLE -- start 
    def test_create_and_delete_study_table(self):
        url = f'/api/study/detail/{self.user_1.username}/{self.study_user_1_public.id}/table/create'
        data = {'method': 'CREATE'}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(self.study_user_1_public.chessstudytable_set.all().count(), 3)
        self.assertEqual(response.status_code, 200)

        url = f'/api/study/detail/{self.user_1.username}/{self.study_user_1_public.id}/table/{self.study_table_1.id}/delete'
        response = self.client.delete(url)
        self.assertEqual(self.study_user_1_public.chessstudytable_set.all().count(), 2)
        self.assertEqual(response.status_code, 200)
    # MANAGE CHESS STUDY TABLE -- end 