import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, InputAdornment, MenuItem, Pagination, Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewModuleIcon from '@mui/icons-material/ViewModuleOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import ViewAgendaIcon from '@mui/icons-material/ViewAgendaOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { CourseGrid } from '../components/CourseCard';
import { NumberedGrid } from '../components/Showcase';
import { Heading, Page } from '../components/Section';
import { GROUP_PILLS, GROUPS } from '../data/courses';
import type { Course } from '../types';
import { courseListLd, usePageMeta } from '../utils/seo';
import { SORTS, useCourses, type SortKey } from './types';
import { coursesStyles as S } from './styles';

type View = 'cards' | 'groups' | 'list';
const VALID_VIEWS: View[] = ['cards', 'groups', 'list'];
function rememberedView(): View {
  try { const v = localStorage.getItem('tx_course_view'); return VALID_VIEWS.includes(v as View) ? v as View : 'cards'; }
  catch { return 'cards'; }
}

function GroupedCourses({ courses }: { courses: Course[] }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const allOpen = GROUP_PILLS.every(([id]) => expanded.includes(id));
  const toggleAll = () => setExpanded(allOpen ? [] : GROUP_PILLS.map(([id]) => id));
  return <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: {xs:1,sm:1.5}, bgcolor: 'background.paper', boxShadow: '0 18px 55px rgba(0,0,0,.12)' }}>
    <Stack direction="row" justifyContent="flex-end" sx={{ mb:1 }}><Button size="small" variant="outlined" onClick={toggleAll}>{allOpen ? 'Collapse all' : 'Expand all'}</Button></Stack>
    {GROUP_PILLS.map(([id], label) => {
      const items = courses.filter(c => c.group === id);
      if (!items.length) return null;
      return <Accordion key={id} expanded={expanded.includes(id)} onChange={(_, open) => setExpanded(prev => open ? [...prev,id] : prev.filter(x=>x!==id))} disableGutters sx={{ mb:1, border: '1px solid rgba(255,255,255,.12)', borderRadius:'12px !important', overflow:'hidden', background: 'linear-gradient(115deg,#17135d,#262180)', '&:before':{display:'none'}, '&.Mui-expanded':{my:1} }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'#fff'}} />} sx={{ minHeight:70, px:{xs:1.5,sm:2.5}, '& .MuiAccordionSummary-content':{my:1.4} }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{width:'100%',pr:1}} gap={1}>
            <Box><Typography sx={{fontWeight:850,color:'#fff',fontSize:{xs:13,sm:16}}}>{GROUPS[id] || label}</Typography><Typography sx={{fontSize:12,color:'#d7d4fb'}}>{items.length} courses · {items.some(c=>!c.price) ? 'free · ' : ''}from {items.every(c=>!c.price) ? 'FREE' : `₹${Math.min(...items.filter(c=>c.price).map(c=>c.price))}`}</Typography></Box>
            <Stack direction="row" sx={{minWidth:92,justifyContent:'flex-end',flexShrink:0}}>{items.slice(0,3).map((c,i)=><Box key={c.id} component="img" alt="" src={c.img} sx={{width:37,height:42,objectFit:'cover',borderRadius:1,ml:i?'-13px':0,border:'2px solid #262180'}} />)}{items.length>3&&<Box sx={{ml:'-10px',bgcolor:'#565478',color:'#fff',width:38,height:42,borderRadius:1,display:'grid',placeItems:'center',fontSize:11}}>+{items.length-3}</Box>}</Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{background:'background.paper',p:{xs:1,sm:2}}}>
          <Box sx={{display:'grid',gap:1.25,gridTemplateColumns:{xs:'1fr',md:'repeat(2,minmax(0,1fr))'}}}>{items.map(c=><Box key={c.id} sx={{display:'flex',alignItems:'center',gap:1.5,p:1,border:'1px solid',borderColor:'divider',borderRadius:2,'&:hover':{borderColor:'primary.main'}}}><Box component="img" alt="" src={c.img} sx={{width:100,aspectRatio:'16 / 9',objectFit:'cover',borderRadius:1}}/><Box sx={{minWidth:0,flex:1}}><Typography fontWeight={750} sx={{fontSize:13,lineHeight:1.3}}>{c.title}</Typography><Typography color="text.secondary" sx={{fontSize:12}}>{c.price?`₹${c.price}`:'FREE'}</Typography></Box><Button size="small" component={RouterLink} to={'/course/'+c.id} aria-label={'Details for '+c.title} endIcon={<ArrowForwardIcon fontSize="small"/>}>Details</Button></Box>)}</Box>
        </AccordionDetails>
      </Accordion>;
    })}
  </Box>;
}

export default function Courses() {
  const c = useCourses();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const viewInUrl = params.get('view');
  const [savedView, setSavedView] = useState<View>(rememberedView);
  const view:View = VALID_VIEWS.includes(viewInUrl as View) ? viewInUrl as View : savedView;
  const pickView = (next:View|null) => { if (!next) return; setSavedView(next); try{localStorage.setItem('tx_course_view',next)}catch{}; const p=new URLSearchParams(params);p.set('view',next);p.delete('page');setParams(p,{replace:true}); };
  usePageMeta({title:'All AI courses', description:`Browse ${c.counts.all} practical AI courses in banner cards, category groups or compact tiles. Explore curriculum before enrolling.`,path:'/courses',jsonLd:[courseListLd(c.list)]});
  const groups = view==='groups';
  return <Page>
    <Heading kick="COURSE CATALOG" title="Find your next" hl="AI skill" sub="Explore all courses, choose your preferred view, and see the full curriculum before enrolling." h1 />
    <Stack direction="row" gap={1} flexWrap="wrap" sx={S.pills} role="group" aria-label="Course category">
      {c.pills.map(([id,label],i)=><Chip key={id} label={`${label} (${c.counts[id]||0})`} clickable onClick={()=>c.pickCat(id)} color={c.cat===id?'primary':'default'} variant={c.cat===id?'filled':'outlined'} sx={S.pill(i)}/>)}
    </Stack>
    <Stack direction={{xs:'column',md:'row'}} spacing={1.5} sx={{...S.bar,gap:0.5}} alignItems={{md:'center'}}>
      <TextField size="small" placeholder="Search courses, tools or skills" value={c.q} onChange={e=>c.setQ(e.target.value)} sx={{...S.search,flex:{md:'1 1 380px'},maxWidth:{xs:'100%',md:460}}} inputProps={{'aria-label':'Search courses','data-testid':'course-search'}} InputProps={{startAdornment:<InputAdornment position="start"><SearchIcon/></InputAdornment>}}/>
      <TextField select size="small" value={c.sort} onChange={e=>c.pickSort(e.target.value)} sx={S.sort} inputProps={{'aria-label':'Sort courses'}}>{(Object.keys(SORTS) as SortKey[]).map(k=><MenuItem key={k} value={k}>{SORTS[k]}</MenuItem>)}</TextField>
      <ToggleButtonGroup size="small" exclusive value={view} onChange={(_,v)=>pickView(v)} aria-label="Course layout">
        <ToggleButton value="cards" aria-label="Banner cards" data-testid="view-cards"><Tooltip title="Banner cards"><ViewModuleIcon fontSize="small"/></Tooltip></ToggleButton>
        <ToggleButton value="groups" aria-label="By category" data-testid="view-groups"><Tooltip title="Grouped categories"><ViewAgendaIcon fontSize="small"/></Tooltip></ToggleButton>
        <ToggleButton value="list" aria-label="Compact tiles" data-testid="view-list"><Tooltip title="Compact tiles"><AppsIcon fontSize="small"/></Tooltip></ToggleButton>
      </ToggleButtonGroup>
      <Typography color="text.secondary" sx={{...S.count,whiteSpace:'nowrap'}} data-testid="course-count">{groups?`${c.list.length} courses`:c.countText}</Typography>
    </Stack>
    <Box key={c.cat+c.sort+c.cur+view} sx={S.grid(c.stale)}>{groups?<GroupedCourses courses={c.list}/>:view==='list'?<NumberedGrid courses={c.shown} start={(c.cur-1)*12+1} action={course=>navigate('/course/'+course.id)}/>:<CourseGrid courses={c.shown}/>}</Box>
    {!c.list.length&&<Box sx={S.empty}><Typography variant="h6">No courses match “{c.q}”.</Typography><Button onClick={c.clear}>Clear filters</Button></Box>}
    {!groups&&c.pages>1&&<Stack alignItems="center" sx={S.pager}><Pagination count={c.pages} page={c.cur} onChange={(_,p)=>c.goPage(p)} color="primary" shape="rounded" siblingCount={0}/></Stack>}
  </Page>;
}
